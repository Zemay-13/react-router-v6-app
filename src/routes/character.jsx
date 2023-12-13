import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router";

export async function getCharacterById(id) {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  return res.json();
}
export const loader = async ({ params }) => {
  const id = params.id;
  return defer({ character: await getCharacterById(id), id });
};

export const CardCharacter = () => {
  const { character } = useLoaderData();

  return (
    <>
      {
        <Suspense fallback={<h1>Loading</h1>}>
          <Await resolve={character}>
            {(resolvedCharacter) => {
              return (
                <>
                  <div id="contact">
                    <img src={resolvedCharacter.image} alt="Card" />
                    <div>
                      <h1>{resolvedCharacter.name}</h1>
                      <p>Gender: {resolvedCharacter.gender}</p>
                      <p>Status: {resolvedCharacter.status}</p>
                    </div>
                  </div>
                </>
              );
            }}
          </Await>
        </Suspense>
      }
    </>
  );
};
