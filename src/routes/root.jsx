import { Suspense } from "react";
import { Await, Outlet, defer, useLoaderData } from "react-router";
import { Link } from "react-router-dom";

async function getCharacters() {
  const res = await fetch("https://rickandmortyapi.com/api/character");

  return res.json();
}

export const loader = async () => {
  return defer({
    characters: await getCharacters(),
  });
};

export default function Root() {
  const { characters } = useLoaderData();

  return (
    <>
      <div id="sidebar">
        <Suspense fallback={<h1>Loading</h1>}>
          <Await resolve={characters}>
            {(resolvedCharacters) => {
              return (
                <nav>
                  {resolvedCharacters ? (
                    <ul>
                      {resolvedCharacters.results.map((character) => (
                        <li key={character.id}>
                          <Link to={`characters/${character.id}`}>
                            {character.name ? (
                              <>{character.name}</>
                            ) : (
                              <i>No Name</i>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>
                      <i>No characters</i>
                    </p>
                  )}
                </nav>
              );
            }}
          </Await>
        </Suspense>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
