import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "../../../utils/api";

import RoundedImage from "../../layouts/RoundedImage";

import useFlashMessage from "../../../hooks/useFlashMessage";

import styles from './Dashboard.module.css';

function MyPets() {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem("token" || ""));
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api
      .get("/pets/mypets", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPets(response.data.pets);
      });
  }, [token]);

  async function removePet(id){
    let msgType = 'success';

    const data = await api.delete(`/pets/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    })
    .then((response) => {
      const updatedPets = pets.filter((pet) => pet._id !== id);
      setPets(updatedPets);
      return response.data;
    })
    .catch((err) => {
      msgType = 'error';
      return err.response.data
    });

    setFlashMessage(data.message, msgType)
  }

  return (
    <section>
      <div className={styles.petlist_headder}>
        <h1>MyPets</h1>
        <Link to={"/pet/add"}>Cadastrar Pet</Link>
      </div>
      <div className={styles.petlist_container}>   
        {pets.length > 0 &&
          pets.map((pet) => (
            <div className={styles.petlist_row} key={pet._id}>
              <RoundedImage
                src={`${process.env.RECT_APP_API}/images/pets/${pet.images[0]}`}
                alt={pet.name}
                width="px75"
              />
              <span className="bold">{pet.name}</span>
              <div className={styles.actions}>
                {pet.available ? 
                (<>
                {pet.adopter &&  (<button className={styles.conclude_btn}>Concluir adoçāo</button>)}
                <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                <button onClick={() => {removePet(pet._id)}}>Excluir</button>
                </>): (<p>Pet já adotado ! :(</p>)}
              </div>
            </div>
          ))}
        {pets.length === 0 && <p> Nāo há pets cadastrados </p>}
      </div>
    </section>
  );
}

export default MyPets;
