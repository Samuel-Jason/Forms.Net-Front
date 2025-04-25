import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { MdDelete, MdEdit } from "react-icons/md";

function ListaPessoas() {
  const [pessoas, setPessoas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  const voltarParaHome = () => {
    navigate("/");
  };

  const carregarPessoas = async () => {
    try {
      setCarregando(true);
      const response = await axios.get("https://localhost:7195/api/Pessoa");
      setPessoas(response.data);
    } catch (error) {
      console.error("Erro ao carregar lista completa:", error);
    } finally {
      setCarregando(false);
    }
  };

  const excluirPessoa = async (id) => {
    try {
      await axios.delete(`https://localhost:7195/api/Pessoa/${id}`);
      setPessoas((prevPessoas) => prevPessoas.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Erro ao excluir pessoa:", error);
    }
  };

  const editarPessoa = (id) => {
    navigate(`/editar/${id}`);
  };

  useEffect(() => {
    carregarPessoas();
  }, []);

  return (
    <div className="lista-container">
      <div className="header">
        <h1>Lista de Pessoas</h1>
        <div className="button-group">
          <button onClick={voltarParaHome} className="back-button">
            Inicio
          </button>
          <button onClick={carregarPessoas} className="refresh-button">
            Atualizar
          </button>
        </div>
      </div>

      {carregando ? (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Carregando dados...</p>
        </div>
      ) : pessoas.length === 0 ? (
        <div className="empty-state">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6b7280"
            strokeWidth="1.5"
          >
            <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"></path>
            <rect x="3" y="4" width="18" height="18" rx="2"></rect>
            <circle cx="12" cy="10" r="2"></circle>
            <line x1="8" y1="2" x2="8" y2="4"></line>
            <line x1="16" y1="2" x2="16" y2="4"></line>
          </svg>
          <p>Nenhuma pessoa encontrada.</p>
          <button onClick={carregarPessoas} className="refresh-button">
            Tentar novamente
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table className="tabela-pessoas">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Gênero</th>
                <th>Telefone</th>
                <th>Estado Civil</th>
                <th>Ativo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pessoas.map((p, index) => (
                <tr
                  key={p.id}
                  className={index % 2 === 0 ? "even-row" : "odd-row"}
                >
                  <td>{p.nome}</td>
                  <td>{p.email}</td>
                  <td>{p.genero}</td>
                  <td>{p.telefone}</td>
                  <td>{p.estadoCivil}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        p.ativo ? "active" : "inactive"
                      }`}
                    >
                      {p.ativo ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="action-buttons">
                    <button
                      onClick={() => editarPessoa(p.id)}
                      className="icon-button edit-button"
                      title="Editar"
                    >
                      <i className="icon">
                        <MdEdit />
                      </i>
                    </button>
                    <button
                      onClick={() => excluirPessoa(p.id)}
                      className="icon-button delete-button"
                      title="Excluir"
                    >
                      <i className="icon">
                        <MdDelete />
                      </i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ListaPessoas;
