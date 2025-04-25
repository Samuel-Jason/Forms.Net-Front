import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./App.css";

function EditarPessoa() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [pessoa, setPessoa] = useState({
    nome: "",
    email: "",
    genero: "",
    telefone: "",
    estadoCivil: "",
    ativo: true,
  });
  
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarPessoa = async () => {
      try {
        const response = await axios.get(`https://localhost:7195/api/Pessoa/${id}`);
        setPessoa(response.data);
      } catch (error) {
        console.error("Erro ao carregar dados da pessoa:", error);
      } finally {
        setCarregando(false);
      }
    };
    carregarPessoa();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPessoa({ ...pessoa, [name]: value });
  };

  const salvarEdicao = async () => {
    try {
      await axios.put(`https://localhost:7195/api/Pessoa/${id}`, pessoa);
      navigate("/"); // Redireciona para a lista de pessoas
    } catch (error) {
      console.error("Erro ao salvar as alterações:", error);
    }
  };

  const cancelarEdicao = () => {
    navigate("/"); // Redireciona para a lista de pessoas
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Pessoa</h2>
        {carregando ? (
          <div className="loader-container">
            <div className="loader"></div>
            <p>Carregando dados...</p>
          </div>
        ) : (
          <div className="form-container">
            <form>
              <div className="input-group">
                <label>Nome:</label>
                <input
                  type="text"
                  name="nome"
                  value={pessoa.nome}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={pessoa.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label>Gênero:</label>
                <select
                  name="genero"
                  value={pessoa.genero}
                  onChange={handleInputChange}
                >
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              <div className="input-group">
                <label>Telefone:</label>
                <input
                  type="text"
                  name="telefone"
                  value={pessoa.telefone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label>Estado Civil:</label>
                <select
                  name="estadoCivil"
                  value={pessoa.estadoCivil}
                  onChange={handleInputChange}
                >
                  <option value="Solteiro">Solteiro</option>
                  <option value="Casado">Casado</option>
                  <option value="Divorciado">Divorciado</option>
                  <option value="Viúvo">Viúvo</option>
                </select>
              </div>
              <div className="input-group">
                <label>Ativo:</label>
                <input
                  type="checkbox"
                  name="ativo"
                  checked={pessoa.ativo}
                  onChange={(e) => handleInputChange({ 
                    target: { name: "ativo", value: e.target.checked } 
                  })}
                />
              </div>
              <div className="button-group">
                <button type="button" onClick={salvarEdicao} className="save-button">
                  Salvar
                </button>
                <button type="button" onClick={cancelarEdicao} className="cancel-button">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditarPessoa;
