import "./App.css";
import React, { useEffect, useState } from "react";
import Api from "./Api";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
  const [introNetflix, setIntroNetflix] = useState("loading");

  useEffect(() => {
    const loadAll = async () => {
      // Pegando a lista Total
      let list = await Api.getHomeList();
      setMovieList(list);

      // Pegando o Featured

      let originals = list.filter((i) => i.slug === "originals");
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Api.getMovieInfo(chosen.id, "tv");
      setFeaturedData(chosenInfo);
    };
    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };
    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  useEffect(() => {
    if (movieList.length < 1) {
      setIntroNetflix("loading");
    } else if (movieList.length >= 1) {
      setTimeout(() => {
        setIntroNetflix("intro");
      }, 2800);

      setTimeout(() => {
        setIntroNetflix("disable");
      }, 5650);
    }
  }, [movieList]);

  console.log(introNetflix);
  return (
    <>
      {introNetflix == "loading" ? (
        <div className="screen-initial">
          <img id="gif-loading" src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Carregando" srcset="" />
        </div>
      ) : introNetflix == "intro" ? (
        <div
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(https://thumbs.gfycat.com/ReflectingNeglectedBug-size_restricted.gif)`,
          }}
          className="screen-initial"
        ></div>
      ) : (
        introNetflix == "disable" && (
          <div className="page">
            <Header black={blackHeader} />
            {featuredData && <FeaturedMovie item={featuredData} />}
            <section className="lists">
              {movieList.map((item, key) => (
                <MovieRow key={key} title={item.title} items={item.items} />
              ))}
            </section>

            <footer>
              Feito por Maycon
              <br /> Direitos de imagem para Netflix Dados pegos do site
              <br />
              Themoviedb.org
            </footer>
          </div>
        )
      )}
    </>
  );
};
