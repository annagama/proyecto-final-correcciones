import { useState } from 'react';
import { useUserStore } from '../../tienda/user-tienda';
import axios from 'axios';
import {errorModal, confirmMessage} from '../../utili/utili';
import { useNavigate } from 'react-router-dom';


const useSignUpForm = () => {


  const login = useUserStore((state) => state.login);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    nacimiento: '',
    numero: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const isFormValid = () => {
    const requiredFields = ['nombre', 'apellido', 'nacimiento', 'numero', 'email', 'password'];
    const isDeptEmpty = formData.depto.trim() === '';

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

    return requiredFields.every(field => formData[field].trim() !== '') &&
      (isDeptEmpty || !isDeptEmpty) &&
      isValidEmail;

    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  
    try {
      
      const response = await signUp(formData);

      if(response.status === 200){
        
        const userObj = await response.data;       

        formData.userId = userObj.sessionData.userId;
        formData.administrador = userObj.sessionData.administrador;
        formData.vfullname = userObj.sessionData.vfullname;
        const modal = confirmMessage(`Su registro ha sido realizado con éxito`);

        await new Promise(resolve => {
          setTimeout(() => {
              modal.destroy();

              resolve();
          }, 3000);
        });

        saveState(formData);
        navigate("/");

      }else{
      
        throw new Error(response);
      }
   

    } catch (error) {      
  
      errorModal(error.response.data.msg);
  
    }
  };


  const signUp = async (formData) => {    
      const response = await axios.post('/user/signup', formData);      
      return response;

  };

  const saveState = (formData) => {
    login(formData);
    setFormData({
      nombre: '',
      apellido: '',
      nacimiento: '',
      numero: '',
      email: '',
      password: ''
    });
  }

  return {
    formData,
    handleChange,
    isFormValid,
    handleSubmit
  };
};

export default useSignUp;
