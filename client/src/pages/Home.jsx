import React, { Component } from "react";
import API from "../utils/API";
import Article from "../components/Article";

class Home extends Component {
  state = {
    articles: [],
    settings: {},
  };
  componentDidMount() {
    const newState = this.state;

    API.getArticles()
      .then((res) => {
        newState.articles = res.data.filter(
          ({ active, category }) => active && [1].includes(category)
        );
        newState.articles.forEach((article) => {
          article.content = article.content
            .split(".")
            .map((sentence) => sentence.trim())
            .filter((sentence) => sentence.length > 0);
        });

        console.log(newState);
        this.setState(newState);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <main className="container">
        <header className="row">
          <div className="col-12">
            <h1>Home</h1>
          </div>
        </header>
        <div className="row">
          {this.state.articles.map((article) => (
            <Article
              key={article.id}
              title={article.title}
              img={article.img}
              category={article.category}
              content={article.content}
            ></Article>
          ))}
        </div>
      </main>
    );
  }
}

export default Home;
