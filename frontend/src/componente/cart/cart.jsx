import React, { useState } from 'react';
import '../Cart/css/Cart.css';
import { Button, Image, Layout, Result, Switch, Table, Modal } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../Store/useCartStore';
import { DeleteFilled } from '@ant-design/icons';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import UserDescription from '../User/UserDescription';
import DescriptionTeach from '../DescriptionTeach/DescriptionTeach';
import Confirm from '../ModalConfirm/Confirm';
import axios from 'axios';

const Cart = () => {
  const cartProduct = useCartStore((s) => s.cart);
  const precioTotal = useCartStore((s) => s.precioTotal);
  const deleteProduct = useCartStore((s) => s.deleteProduct);
  const obtenerCarrito = useCartStore((s) => s.getProduct);
  const [envio, setEnvio] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isResultVisible, setIsResultVisible] = useState(false);
  const [result, setResult] = useState({
    state: '',
    title: '',
    response: ''
  });
  
  const navigate = useNavigate();

  const onChangeSwitch = (checked) => {
    setEnvio(checked);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsSpinning(true);

    try {
      const response = await axios.post('/Api/pedido/generarPedido', {
        id_orden_compra: cartProduct[0].id_orden_compra,
        ftotal: envio ? precioTotal + 6000 : precioTotal,
        benvio: envio,
      });
    
      if (response.status === 200) {
        setResult({
          state: 'success',
          title: 'Gracias por su Compra',
          response: response.data.msg,
        });

        

        setTimeout(() => {
          setIsSpinning(false);
          setIsModalVisible(false);
          setIsResultVisible(true);

          setTimeout(() => {
            obtenerCarrito();
            navigate('/');
          }, 2000);
        }, 3000);
      } else {
        setIsSpinning(false);
        setIsModalVisible(false);
        setResult({
          state: 'error',
          title: 'Error al general el pedido',
          response: 'Intentelo mas tarde',
        });
        setIsResultVisible(true);
      }
    } catch (error) {
      setIsSpinning(false);
      setIsModalVisible(false);
      setResult({
        state: 'error',
        title: 'Ha surgido un error',
        response: error.response ? error.response.data.msg : 'Error desconocido',
      });
      setIsResultVisible(true);
    }
  };
  
