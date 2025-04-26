import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    genero: '',
    telefone: '',
    estadoCivil: '',
    ativo: true,
    cidade: '',
    estado: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post('https://localhost:7195/api/Pessoa', formData);
      setFormData(prevData => ({
        nome: prevData.nome,
        email: '',
        genero: '',
        telefone: '',
        estadoCivil: '',
        ativo: true,
        cidade: '',
        estado: prevData.estado // ✅ Agora está acessando corretamente
      }));
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Erro ao cadastrar pessoa:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-container dark-theme">
      <div className="header">
        <h1>Cadastro de Pessoas</h1>
        <button 
          className="secondary-button"
          onClick={() => navigate('/lista')}
        >
          Ver Lista
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M10 12a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
            <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
          </svg>
        </button>
      </div>

      <div className="form-container card">
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Informações Pessoais</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="nome">Nome *</label>
                <input 
                  type="text" 
                  id="nome"
                  name="nome" 
                  value={formData.nome} 
                  onChange={handleChange} 
                  required 
                  placeholder="Digite o nome completo"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input 
                  type="email" 
                  id="email"
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  placeholder="exemplo@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="genero">Gênero</label>
                <select 
                  id="genero"
                  name="genero" 
                  value={formData.genero} 
                  onChange={handleChange}
                >
                  <option value="">Selecione...</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="telefone">Telefone</label>
                <input 
                  type="tel" 
                  id="telefone"
                  name="telefone" 
                  value={formData.telefone} 
                  onChange={handleChange} 
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div className="form-group">
                <label htmlFor="estadoCivil">Estado Civil</label>
                <select 
                  id="estadoCivil"
                  name="estadoCivil" 
                  value={formData.estadoCivil} 
                  onChange={handleChange}
                >
                  <option value="">Selecione...</option>
                  <option value="Solteiro(a)">Solteiro(a)</option>
                  <option value="Casado(a)">Casado(a)</option>
                  <option value="Divorciado(a)">Divorciado(a)</option>
                  <option value="Viúvo(a)">Viúvo(a)</option>
                  <option value="Separado(a)">Separado(a)</option>
                </select>
              </div>
            </div>
          </div>

          {/* <div className="form-section">
            <h2>Localização</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cidade">Cidade</label>
                <input 
                  type="text" 
                  id="cidade"
                  name="cidade" 
                  value={formData.cidade} 
                  onChange={handleChange} 
                  placeholder="Sua cidade"
                />
              </div>

              <div className="form-group">
                <label htmlFor="estado">Estado</label>
                <select 
                  id="estado"
                  name="estado" 
                  value={formData.estado} 
                  onChange={handleChange}
                >
                  <option value="">Selecione...</option>
                  <option value="AC">Acre</option>
                  <option value="AL">Alagoas</option>
                  <option value="AP">Amapá</option>
                  <option value="AM">Amazonas</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="GO">Goiás</option>
                  <option value="MA">Maranhão</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="PA">Pará</option>
                  <option value="PB">Paraíba</option>
                  <option value="PR">Paraná</option>
                  <option value="PE">Pernambuco</option>
                  <option value="PI">Piauí</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="RO">Rondônia</option>
                  <option value="RR">Roraima</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="SP">São Paulo</option>
                  <option value="SE">Sergipe</option>
                  <option value="TO">Tocantins</option>
                </select>
              </div>
            </div>
          </div> */}

          <div className="form-section">
            <div className="form-group checkbox-group">
              <label htmlFor="ativo">
                <input 
                  type="checkbox" 
                  id="ativo"
                  name="ativo" 
                  checked={formData.ativo} 
                  onChange={handleChange} 
                />
                <span className="custom-checkbox"></span>
                Ativo
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="primary-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Cadastrando...
                </>
              ) : (
                'Cadastrar'
              )}
            </button>
          </div>

          {submitSuccess && (
            <div className="success-message">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
              </svg>
              Cadastro realizado com sucesso!
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;