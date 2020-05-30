import React, { Component } from "react";
import Article from "../components/Article";

class Home extends Component {
  state = {
    articles: [],
  };
  componentDidMount() {
    const newState = this.state;
    newState.articles.push({
      title: "test",
      content: ["Paragraph1", "Paragraph2. Second Sentence."],
    });
    newState.articles.push({
      title: "test2",
      content: [
        "Paragraph1. Sentence 2",
        "Paragraph2. Second Sentence. Sentence 3.",
      ],
    });

    this.setState(newState);
  }
  render() {
    return (
      <>
        <h1>Home</h1>
        <main className="container">
          <div className="row">
            {this.state.articles.map((article) => (
              <Article
                title={article.title}
                content={article.content}
              ></Article>
            ))}
          </div>
        </main>
      </>
    );
  }
}

export default Home;
