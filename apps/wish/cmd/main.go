package main

import (
	"context"
	"errors"
	"log"
	"net"
	"os"
	"os/signal"
	"syscall"
	"time"

	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/ssh"
	"github.com/charmbracelet/wish"
	"github.com/charmbracelet/wish/activeterm"
	"github.com/charmbracelet/wish/bubbletea"
	"github.com/charmbracelet/wish/recover"
	"github.com/sst/sst/v3/sdk/golang/resource"
	"gurvirsingh.me/pkg/tui"
)

func main() {
	if err := createServer(); err != nil {
		log.Fatal(err)
	}
}

func createServer() error {
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	serverKey, err := resource.Get("ConnectionKey", "privateKey")
	if err != nil {
		log.Fatal("Unable to read the host private key!")
		return err
	}

	s, err := wish.NewServer(
		wish.WithAddress(net.JoinHostPort("0.0.0.0", "2222")),
		wish.WithHostKeyPEM([]byte(serverKey.(string))),
		wish.WithMiddleware(
			recover.Middleware(activeterm.Middleware(), bubbletea.Middleware(teaHandler)),
		),
	)
	if err != nil {
		return err
	}

	go func() {
		if err := s.ListenAndServe(); err != nil && !errors.Is(err, ssh.ErrServerClosed) {
			log.Printf("Server Error:\n%s", err)
			stop()
		}
	}()

	<-ctx.Done()
	shutdownCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	return s.Shutdown(shutdownCtx)
}

func teaHandler(s ssh.Session) (tea.Model, []tea.ProgramOption) {
	renderer := bubbletea.MakeRenderer(s)
	return tui.NewModel(renderer), []tea.ProgramOption{tea.WithAltScreen()}
}
