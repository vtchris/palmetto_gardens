import React, { Component } from "react";
import API from "../utils/API";
import Article from "../components/Article";

class Services extends Component {
  state = {
    articles: [],
  };
  componentDidMount() {
    const newState = this.state;

    API.getArticles()
      .then((res) => {
        newState.articles = res.data.filter(
          ({ active, category }) => active && [2].includes(category)
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
      <>
        <h1>Services</h1>
        <main className="container">
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
      </>
    );
  }
}

export default Services;
