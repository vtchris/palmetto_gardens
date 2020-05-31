import React from "react";

function Article(props) {
  return (
    <div className="col col-md-6 col-12">
      <article className="card m-3">
        <header className="card-header bg-secondary text-light">
          <h1 className="card-title">{props.title.toUpperCase()}</h1>
        </header>
        <main className="card-body">
          {props.content.map(sentence => 
            <p className="text-left">{`${sentence}. `}</p>
          )}
          
        </main>
      </article>
    </div>
  );
}

export default Article;
