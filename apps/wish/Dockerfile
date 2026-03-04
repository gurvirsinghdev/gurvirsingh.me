FROM mirror.gcr.io/golang:alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o ssh ./cmd/main.go

# Second stage: build the runtime image.
FROM mirror.gcr.io/alpine:3.21.2
WORKDIR /main/
ENV FOO=1
COPY --from=builder /app/ssh .
CMD TERM=xterm-256color ./ssh