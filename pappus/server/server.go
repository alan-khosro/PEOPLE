package main

import (
	"context"
	"fmt"
	"log"
	"net"

	pb "pappus/proto"

	"google.golang.org/grpc"
)

var (
	port = 50051
)

type server struct {
	pb.UnimplementedChatServer
}

func (s *server) PostMessage(ctx context.Context, in *pb.Message) (*pb.Message, error) {
	log.Printf("Received: %v", in.Content)
	return &pb.Message{Content: "Got it!"}, nil
}

func main() {
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	s := grpc.NewServer()
	pb.RegisterChatServer(s, &server{})
	log.Printf("server listening at %v", lis.Addr())

	err = s.Serve(lis)
	if err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
