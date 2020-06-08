import React from "react";

function Article(props) {
  const colorClass = ['secondary','primary','success','info'][props.category -1]
  return (
    <div className="col col-md-6 col-12">
      <article className="card m-3">
        <header className={`card-header bg-${colorClass} text-light`}>
          <h2 className="card-title">{props.title.toUpperCase()}</h2>
        </header>
        <main className="card-body">
          {props.img ? <img src={props.img} width="150" className="img-fluid img-thumbnail float-left mr-2" alt={props.title} ></img> : ""}
          {props.content.map(sentence => 
            <p className="text-left" >{`${sentence}. `}</p>
          )}
          
        </main>
      </article>
    </div>
  );
}

export default Article;
