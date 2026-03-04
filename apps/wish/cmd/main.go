package main

import (
	"context"
	"crypto/md5"
	"encoding/hex"
	"errors"
	"fmt"
	"log/slog"
	"net"
	"os"
	"os/signal"
	"syscall"

	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/ssh"
	"github.com/charmbracelet/wish"
	"github.com/charmbracelet/wish/activeterm"
	"github.com/charmbracelet/wish/bubbletea"
	"github.com/charmbracelet/wish/recover"
	"github.com/muesli/termenv"
	"github.com/sst/sst/v3/sdk/golang/resource"
	"gurvirsingh.me/pkg/tui"
)

func main() {
	ctx, cancel := context.WithCancel(context.Background())
	osChannel := make(chan os.Signal, 1)
	signal.Notify(osChannel, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)
	go func() {
		<-osChannel
		cancel()
	}()

	connectionPrivateKey, err := resource.Get("ConnectionKey", "privateKey")
	if err != nil {
		panic(err)
	}

	s, err := wish.NewServer(
		wish.WithAddress(net.JoinHostPort("0.0.0.0", "2222")),
		wish.WithHostKeyPEM([]byte(connectionPrivateKey.(string))),
		wish.WithMiddleware(
			recover.Middleware(bubbletea.Middleware(teaHandler), activeterm.Middleware()),
		),
		wish.WithPublicKeyAuth(func(ctx ssh.Context, publicKey ssh.PublicKey) bool {
			hash := md5.Sum(publicKey.Marshal())
			fingerprint := hex.EncodeToString(hash[:])
			ctx.SetValue("fingerprint", fingerprint)
			return true
		}),
	)

	if err != nil {
		panic(fmt.Sprintf("Unable to start the server:\n%s", err))
	}
	if err = s.ListenAndServe(); err != nil && !errors.Is(err, ssh.ErrServerClosed) {
		cancel()
		panic(fmt.Sprintf("Unable to start the server:\n%s", err))
	}
	slog.Info("Server Started", "server", "started")

	<-ctx.Done()
	s.Shutdown(ctx)
}

type SessionBridge struct {
	ssh.Session
	tty *os.File
}

func (s *SessionBridge) Write(data []byte) (int, error) {
	return s.Session.Write(data)
}
func (s *SessionBridge) Read(data []byte) (int, error) {
	return s.Session.Read(data)
}
func (s *SessionBridge) Fd() uintptr {
	return s.tty.Fd()
}

func teaHandler(s ssh.Session) (tea.Model, []tea.ProgramOption) {
	pty, _, _ := s.Pty()
	sessionBridge := &SessionBridge{
		Session: s, tty: pty.Slave,
	}
	renderer := bubbletea.MakeRenderer(sessionBridge)
	fingerprint := s.Context().Value("fingerprint").(string)
	command := s.Command()
	slog.Info("Client Fingerprint", "fingerprint", fingerprint)
	slog.Info("Client Command", "command", command)

	clientAddr := s.RemoteAddr().String()
	host, _, _ := net.SplitHostPort(clientAddr)
	slog.Info("Client IP", "host", host)

	if pty.Term == "xterm-ghostty" {
		renderer.SetColorProfile(termenv.TrueColor)
	}

	return tui.NewModel(), nil
}
