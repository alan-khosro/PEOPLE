package main

import (
	"context"
	"log"
	"time"

	pb "pappus/proto"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func main() {
	conn, err := grpc.Dial("localhost:50051", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	c := pb.NewChatClient(conn)

	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	r, err := c.PostMessage(ctx, &pb.Message{Content: "Client message"})
	if err != nil {
		log.Fatalf("could not send request: %v", err)
	}
	log.Printf("Success to send client message: %s", r.Content)
}
