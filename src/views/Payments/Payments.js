import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import * as ROUTES from '../../routes/routes'

import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';

import Plus from '../../assets/img/plus.png'
import Trash from '../../assets/img/trash.png'

import "./payments.scss"

function Payments() {

    const navigate = useNavigate();

    const {state} = useLocation();
    const {document, client, articles, resume} = state
    
    const [order, setOrder] = useState(0);
    const [show, setShow] = useState(false);

    const [method, setMethod] = useState(0);
    const [ammount, setAmmount] = useState(0);
    const [methods, setMethods] = useState([
        '00 Depósito en cuenta',
        '01 Efectivo soles',
        '02 Efectivo dólares',
        '03 Tarjeta Visa',
        '04 Tarjeta Mastercard',
    ])
    const [resumePayment, setResumePayment] = useState({
        remaining: 0,
        total: 0,
    })

    const [payments, setPayments] = useState([
    ])

    const handleClose = () => setShow(false);
    const handleShow = (type) => setShow(true);

    useEffect(() => {
        let newResumePayment = {
            remaining: resume.total,
            total: 0,
        }

        for (const payment of payments) {
            newResumePayment.remaining -= payment.ammount
            newResumePayment.total += payment.ammount;
        }

        newResumePayment.remaining = Math.round((newResumePayment.remaining  + Number.EPSILON) * 100) / 100
        newResumePayment.total = Math.round((newResumePayment.total  + Number.EPSILON) * 100) / 100

        setResumePayment(newResumePayment)

    }, [payments, resume])

    const handleMethod = (event) => {
        setMethod(event.target.value)
    }

    const addPayment = () => {
        setPayments([...payments, {id: order, method: methods[method], ammount: parseFloat(ammount)}])
        setOrder(order + 1)
        setMethod(0)
        setAmmount(0)
    }

    const deletePayment = (payment) => {
        setPayments(payments.filter((pay) => pay.id !== payment.id))
    }

    const paymentElements = (
        payments.map((payment) => {
            return (
                <Card className='article'>
                    <Col className='col col-7'>
                        {payment.method}
                    </Col>
                    <Col className='col col-5'>
                        <Row className='m-0'>
                            <Col className='d-flex justify-content-end'>
                                S/ {payment.ammount}
                            </Col>
                            <Col className='d-flex justify-content-end'>
                                <Image src={Trash} width={20} height={20} style={{cursor: 'pointer'}} onClick={() => deletePayment(payment)}></Image>
                            </Col>
                        </Row>
                    </Col>
                </Card>
            )
        })
    )

    return (
        <div>
            <div className='p-4'>
                <Row className='m-0 mb-2'>
                    <h4>RESUMEN DE VENTAS - {document.type === 'factura' ? 'FACTURA' : 'BOLETA'}: {document.serie}-{document.number}</h4>
                </Row>
                <Row className='m-0 mb-4'>
                    <h4>{client.id} - {client.name}</h4>
                </Row>
                <Card>
                    <Row className='m-0 article'>
                        <Col className='col col-3'>
                            <Row className='m-0'>
                                <Col>
                                    Subtotal:
                                </Col>
                                <Col>
                                    S/ {resume.subtotal}
                                </Col>
                            </Row>
                        </Col>
                        <Col className='col col-3'>
                            <Row className='m-0'>
                                <Col>
                                    Descuentos:
                                </Col>
                                <Col>
                                    S/ {resume.discounts}
                                </Col>
                            </Row>
                        </Col>
                        <Col className='col col-3'>
                            <Row className='m-0'>
                                <Col>
                                    I.G.V.:
                                </Col>
                                <Col>
                                    S/ {resume.igv}
                                </Col>
                            </Row>
                        </Col>
                        <Col className='col col-3'>
                            <Row className='m-0'>
                                <Col>
                                    Total:
                                </Col>
                                <Col>
                                    S/ {resume.total}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
            </div>
            <div className='p-4 pt-0'>
                <Card>
                    <Card.Header className='m-0'>
                        <h4 className='m-2'>REGISTRO DE PAGOS</h4>
                    </Card.Header>
                    <Card.Body>
                        <Row className='m-0 mb-4'>
                            <Col className='col col-8'>
                                <Row className='m-0'>
                                    <Col className='col col-3 d-flex align-items-center'>
                                        Tipo de Pago
                                    </Col>
                                    <Col className='col col-9 d-flex align-items-center'>
                                        <Form.Select aria-label="Seleccionar" value={method} onChange={handleMethod}>
                                            <option className='d-none'>Seleccionar</option>
                                            {methods.map((met, index) => {
                                                return (
                                                    <option value={index}>{met}</option>
                                                )
                                            })}
                                        </Form.Select>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className='col col-4'>
                                <Row className='m-0'>
                                    <Col className='col col-3 d-flex align-items-center'>
                                        Monto
                                    </Col>
                                    <Col className='col col-6 d-flex align-items-center'>
                                        <InputGroup>
                                            <FormControl id="article-caducated" value={ammount} onChange={(event) => setAmmount(event.target.value)}/>
                                        </InputGroup>
                                    </Col>
                                    <Col className='col col-3'>
                                        <Image
                                            roundedCircle
                                            className=' p-1'
                                            style={{
                                                cursor: 'pointer'
                                            }}
                                            src={Plus}
                                            width={35}
                                            height={35}
                                            onClick={addPayment}></Image>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        {paymentElements}
                        <Row className='m-0 d-flex justify-content-end text-end mb-3 mt-3'>
                            <Col className='col col-2'>
                                <strong>Restante:</strong> S/ {resumePayment.remaining}
                            </Col>
                            <Col className='col col-2'>
                                <strong>Total:</strong> S/ {resumePayment.total}
                            </Col>
                        </Row>
                        <Row className='m-0 d-flex justify-content-end'>
                            <Col className='col-auto d-flex justify-content-end'>
                                <Button onClick={handleShow}>REGISTRAR PAGO</Button>
                            </Col>
                            <Col className='col-auto d-flex justify-content-end'>
                                <Button onClick={() => navigate(ROUTES.NUEVO_DOCUMENTO)}>CANCELAR</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>

            <Modal show={show} onHide={handleClose} size="xl" centered>
                <Modal.Header closeButton>
                    <Modal.Title>RESUMEN DE VENTAS - {document.type === 'factura' ? 'FACTURA' : 'BOLETA'}: {document.serie}-{document.number}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className='m-0 mb-3'>
                        <Card className='p-4'>
                            <h4>{client.id} - {client.name}</h4>
                        </Card> 
                    </Row>
                    <Row className='m-0'>
                        <Card className='p-4 d-flex justify-content-center'>
                            <Row className='m-0'>
                                <Col className='text-end'>
                                    Subtotal:
                                </Col>
                                <Col>
                                    S/. {resume.subtotal}
                                </Col>
                            </Row>
                            <Row className='m-0'>
                                <Col className='text-end'>
                                    Descuentos:
                                </Col>
                                <Col>
                                    S/. {resume.discounts}
                                </Col>
                            </Row>
                            <Row className='m-0'>
                                <Col className='text-end'>
                                    I.G.V.:
                                </Col>
                                <Col>
                                    S/. {resume.igv}
                                </Col>
                            </Row>
                            <Row className='m-0'>
                                <Col className='text-end'>
                                    Total:
                                </Col>
                                <Col>
                                    S/. {resume.total}
                                </Col>
                            </Row>
                        </Card> 
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Payments