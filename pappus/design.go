// It is a messager app and we follow golang naming convention and design mindset.

package main

import (
	"encoding/json"
	"fmt"

	//	"bytes"
	//	"os"
	"io/ioutil"
)

type Messages struct {
	Id      string
	Topic   string
	Content []Message
}

type Message struct {
	From    Person
	To      []Person
	Content string
}

type Person struct {
	Id   string
	Name string
}

func main() {
	filePath := "data/test.json"

	/*	p1 := Person{"ali", "ali khosro"}
			p2 := Person{"allison", "Allison"}
			p3 := Person{"hossein", "Hossein"}
			p4 := Person{"parisa", "Parisa"}


			m1 := Message{p1, []Person{p2, p3}, "hello"}
			m2 := Message{p2, []Person{p1, p3, p4}, "bye"}

			mes1 := Messages{"mes1", "first topic", []Message{m1, m2}}

			js, _ := json.Marshal(mes1)
			//fmt.Println(string(js))

		//	var out bytes.Buffer
		//	bytes, _ := json.Marshal(js)
		//	out.WriteTo(os.Stdout)

			_ = ioutil.WriteFile(filePath, js, 0644)
	*/
	content, _ := ioutil.ReadFile(filePath)
	mes2 := Messages{}
	json.Unmarshal(content, &mes2)

	fmt.Println(mes2)

}
