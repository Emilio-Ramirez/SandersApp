import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectDescription = () => {
  const { id } = useParams();

  // Aquí puedes hacer una llamada a una API para obtener los detalles del proyecto usando el ID

  return (
    <div>
      <h2>Project Description</h2>
      <p>Detalles del proyecto con ID: {id}</p>
      {/* Aquí se mostrarán los detalles del proyecto */}
    </div>
  );
};

export default ProjectDescription;
