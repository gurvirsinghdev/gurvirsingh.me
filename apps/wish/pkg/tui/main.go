package tui

import (
	"fmt"
	"strings"

	"github.com/charmbracelet/bubbles/viewport"
	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
)

type model struct {
	width    int
	height   int
	viewport viewport.Model
	renderer *lipgloss.Renderer
}

func NewModel(r *lipgloss.Renderer) tea.Model {
	vp := viewport.New(0, 0)
	vp.YPosition = 0

	return model{renderer: r, viewport: vp}
}

func (m model) Init() tea.Cmd {
	return nil
}

func (m model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.WindowSizeMsg:
		docWidth := 80
		m.width = msg.Width
		m.height = msg.Height
		m.viewport.Width = docWidth - 4
		m.viewport.Height = msg.Height - 1
		m.viewport.SetContent(renderResume(docWidth))

	case tea.KeyMsg:
		switch msg.String() {
		case "q", "ctrl+c":
			return m, tea.Quit
		}
	}

	var cmd tea.Cmd
	m.viewport, cmd = m.viewport.Update(msg)
	return m, cmd
}

func (m model) View() string {
	doc := m.viewport.View()
	return m.renderer.Place(
		m.width,
		m.height,
		lipgloss.Center,
		lipgloss.Top+1,
		doc,
	)
}

func renderResume(width int) string {
	title := lipgloss.NewStyle().Bold(true).Align(lipgloss.Center).Width(width).Render("Gurvir Singh")

	contactInfo := lipgloss.NewStyle().Align(lipgloss.Center).Width(width).Render("Abbotsford, BC V3G\n+1 (XXX) XXX XXXX | hi@gurvirsingh.me")

	intro := "\nFull-stack web developer with hands-on experience building web applications\nusing Javascript, React, PHP, and MySQL. Worked with international and local\nclients to develop and deliver custom software solutions, including internal\nbusiness tools, and web platforms. Comfortable handling both front-end and\nback-end development, and collaborating with cross-functional teams.\n"

	skills := twoColumn(
		[]string{"JavaScript", "React", "Node.js", "PHP"},
		[]string{"MySQL", "REST APIs", "Git", "Responsive website development"},
		width,
	)

	experience := "\n01/2021 - 01/2024\nFreelance —  Remote\nFull-Stack Developer\n\nWorked on contract projects for international and local clients, building\nweb applications and custom software solutions. Developed a complete\ninternal invoice management dashboard for a UK company, handling front-end\nand back-end, while coordinating with database, cloud, and design teams.\n"

	education := "\nUniversity of The Fraser Valley — Abbotsford, BC\nBachelor of Science: Computing Science\n\nHarvest International School — Sudhar, India\nHigh School Diploma\n"

	certifications := "\nMERN Stack Program — ThinkNext Technologies (2022)\nWeb Development Certification (PHP & Laravel) — Brilliko Institute (2022)\n"

	linkedin := "\nlinkedin.com/in/gurvirsinghdev/\n"

	var b strings.Builder
	b.WriteString(title)
	b.WriteString(contactInfo)

	b.WriteString(divider("Introduction", width))
	b.WriteString(intro)

	b.WriteString(divider("Skills", width))
	b.WriteString(skills)

	b.WriteString(divider("Experience", width))
	b.WriteString(experience)

	b.WriteString(divider("Education", width))
	b.WriteString(education)

	b.WriteString(divider("Certifications & Training", width))
	b.WriteString(certifications)

	b.WriteString(divider("LinkedIn", width))
	b.WriteString(linkedin)

	b.WriteString(strings.Repeat("-", width))
	b.WriteString("\n↑ ↓ scroll   q quit\n")

	return b.String()
}

func divider(title string, width int) string {
	titleLen := len(title)
	return fmt.Sprintf("\n%s %s %s", strings.Repeat("-", 10), title, strings.Repeat("-", width-titleLen-10))
}

func twoColumn(left []string, right []string, width int) string {

	colWidth := width / 2
	rows := max(len(left), len(right))

	var out strings.Builder

	for i := 0; i < rows; i++ {

		l := ""
		r := ""

		if i < len(left) {
			l = "• " + left[i]
		}

		if i < len(right) {
			r = "• " + right[i]
		}

		out.WriteString(
			fmt.Sprintf(
				"%-*s%-*s\n",
				colWidth,
				l,
				colWidth,
				r,
			),
		)
	}

	return out.String()
}
