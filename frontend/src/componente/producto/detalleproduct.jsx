import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Image, Alert, Layout, List, Avatar, Rate, Button, Form, Input } from 'antd';
import { Descriptions } from 'antd';
import { disponibilidadStock, confirmMessage, errorModal } from '../../utili/utili';
import './css/DetailProduct.css';
import axios from 'axios';
import { Content } from 'antd/es/layout/layout';
import { useUserStore } from '../../tienda/carrito-tienda';
import Sider from 'antd/es/layout/sider';

const contentStyle = {
    textAlign: 'center',
    width: 500,   
    color: 'black',
    backgroundColor: 'white',
};
const siderStyle = {
    textAlign: 'center',    
    color: 'black',

    backgroundColor: '#65D690',
  };

const DetailProduct = () => {
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const [error, setError] = useState(null);
    const current_user = useUserStore();
    const [form] = Form.useForm();
      rate: 'undefined' 
          if (response.status === 200) {
           
            const modal = confirmMessage(`${response.data.msg}`);    
                            
            await new Promise(resolve => {
                setTimeout(() => {
                    modal.destroy();
                    form.resetFields()
                    resolve();
                }, 2000);
            });
            
          } else {
            errorModal(error.response.data.msg);
          }
        } catch (error) {
         
          errorModal(error.response.data.msg);
        }
      };

 

    const getProductById = async (id) => {
        try {
            const resp = await axios.get(`/Api/product/getProductById/${id}`);           
            const product = await resp.data;
            return product.data[0];
        } catch (error) {
            setError(error.response ? error.response.data.msg : 'Error desconocido');
            throw error; 
        }
    };
    const values = Form.useWatch([], form);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const details = await getProductById(id);
                const comentarios = await getComentariosById(id);
                setProductDetails(details);
                setComentarios(comentarios.data)
            } catch (error) {
                console.error( error);
            }
        };

        form.validateFields({validateOnly: true,}).then(() => {setSubmittable(true);}, () => {setSubmittable(false);},);

        fetchData();
    }, [id, values]);
    
    return (
        <>
            <section className="section-detail">
                {productDetails ? (
                    <>
                        <div>
                            <h1>{productDetails.vnombre}</h1>
                        </div>
                        <figure>
                            <Image width={600} height={400} src={productDetails.vpath} />
                        </figure>
                        <div style={{ marginLeft: '150px' }}>
                            <Descriptions title="Descripcion" column={1}>
                                <Descriptions.Item label="Descripción">
                                    {productDetails.tdescripcion}
                                </Descriptions.Item>
                            </Descriptions>
                            <Descriptions title="Detalles" column={4}>
                                <Descriptions.Item label="Categoría">{productDetails.vcategoria}</Descriptions.Item>
                                <Descriptions.Item label="Precio">${productDetails.fpreciooferta}</Descriptions.Item>
                                <Descriptions.Item label="Precio">{disponibilidadStock()}</Descriptions.Item>
                            </Descriptions>
                            {productDetails.bofertavalida === 1 && (
                                <Descriptions title="Oferta" column={1}>
                                    <Descriptions.Item label="Oferta Hasta">
                                        {productDetails.dofertahasta}
                                    </Descriptions.Item>
                                </Descriptions>
                            )}
                            
                            {current_user.isLogged && !current_user.usuario.administrador ? ( <Sider width={siderWidth} style={siderStyle}>
                                <Form
                                form={form}
                                name="basic"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                style={{ maxWidth: 600 }}                                
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                autoComplete="off"
                                >
                          
                                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                    <Button type="primary" htmlType="submit" disabled={!submittable}>
                                    Enviar
                                    </Button>
                                </Form.Item>
                                </Form>
                            </Sider>) : null}
                        </Layout>
                        
                    </>
                ) : (
                    <Alert
                        message="Error"
                        description={error}
                        type="error"
                        closable
                        />
                )}
            </section>
        </>
    );
};

export default DetailProduct;
