import React, { Component } from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import "./style.css";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "Dieter",
      subject: "java",
      news_api: {
        status: "ok",
        source: "time",
        sortBy: "top",
        articles: [
          {
            author: "Lissandra Villa",
            title: "Coronavirus Overshadows emergency.",
            url: "http://time.com",
            urlToImage: "https://api.time.com",
            publishedAt: "2020-03-16T04:23:24Z"
          }
        ]
      },
      myArticles: [
        {
          author: "Charlotte Alter",
          title: "Joe Biden Definitivel President",
          description: "In the first one-on-one Democraticent.",
          url: "http://time.com"
        }
      ]
    };

     this.handleChange = this.handleChange.bind(this);
  }

  handleClick() {
    console.log("button clicked");
  //  console.log("this is:", this);
    let self = this;
    var currentSubject = this.state.subject;
    var URL =
      "https://newsapi.org/v2/everything?q=" + currentSubject + "&sortBy=publishedAt&apiKey=1d825f6378f2460d8bcf7edc35915e0f";

    axios
      .get(URL)
      //   axios.get('https://599d6a620a785b0011f4f6c8.mockapi.io/users')
      //   axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(function(response) {
        // myString = JSON.parse(response.data);
        console.log(response);
        self.setState({
          news_api: response.data,
          myArticles: response.data.articles
        });
      })
      .catch(function(error) {
        console.log(error);
      });
     //      console.log("logging myArticles");
    // console.log("this is:",this);
     console.log("subject :", this.state.subject);
     console.log("from :", URL);
    //  console.table(this.state.news_api.articles);
      
  }

  handleChange(event) {
      let self = this;
    self.setState({subject: event.target.value});
  }

  render() {
    console.log("rendering");

    return (
      <div>
        <Hello name={this.state.name} />
        <label>
    Subject:

    <input type="text" value={this.state.subject} onChange={this.handleChange} />
  </label> <br />
        <button onClick={() => this.handleClick()}>
          Get News from newsapi.org
        </button>
        <br />
        <br />

        {this.state.myArticles.map(item => (
          <ul>
            {item.title}
            <br />
            <a target="_blank" href={item.url}>
              {" "}
              {item.url}
            </a>
            <br />
            {item.description}
          </ul>
        ))}
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
