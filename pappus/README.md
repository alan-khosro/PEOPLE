# Pappus
Pappus is a replacement for whatsapp (a messaging app) developed for web.
Differentiations:
- It is credit based messaging
    - Sender pays 10 points per message (per person)
    - Receiver receives 5 points per message
    - It is supposed to control unwanted messages
    - It makes focused environment (no unwanted messages and notifications)
    - It might be a way of monetizing
- It has subscriber discount
    - subscribers receive no point
    - subscribed-to pays no point
    - subscribers pay monthly point for each active subscribe
- It is a smart matrix (table) layout
- It is an extended markdown (with forms and graphs) as the default content
- It might support "unsecure" content (unrestricted web content) 


## Design


## Compile and Deploy

- Create module pappus
    ```
    go mod init pappus
    ```

- Compile proto file to create protobuff transfering files
    ```
    protoc --go_out=. --go_opt=paths=source_relative --go-grpc_out=. --go-grpc_opt=paths=source_relative proto/chatter.proto
    ```

- Compile and run server
    ```
    go run server/server.go
    ```

- Compile and run client
    ```
    go run client/client.go



## TODO
iteration 0.1
- [ ] create proto file to exchange a simple text message
- [ ] create go server
- [ ] create go client
- [ ] create go module, run client and server, and get success message
iteration 0.2
- [ ] install dart and flutter
- [ ] create dart client for simple text message
- [ ] run client.js and server.go and get success message

- [ ] golang server to send json file
- [ ] frontend js to receive json files and show contents

