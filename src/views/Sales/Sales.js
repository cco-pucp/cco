import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import * as ROUTES from '../../routes/routes'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Image from 'react-bootstrap/Image'
import Modal from 'react-bootstrap/Modal'
import Card from 'react-bootstrap/Card'

import DatePicker, { registerLocale } from "react-datepicker";
import {es} from 'date-fns/locale';


import Trash from '../../assets/img/trash.png'
import Search from '../../assets/img/search.png'

import "./sales.scss"

function Sales() {
    registerLocale('es', es);

    const navigate = useNavigate();

    const [show,
        setShow] = useState(false);
    const [searchType, setSearchType] = useState('client');

    const [document, setDocument] = useState({
        serie: '',
        number: '',
        created: '',
        caducated: '', 
        type: 'factura',
    })

    const [client, setClient] = useState({});
    const [articles, setArticles] = useState([])
    const [resume, setResume] = useState({
        subtotal: 0,
        discounts: 0,
        igv: 0,
        total: 0,
    })

    const [clientResults, setClientResults] = useState([
        {
            id: '11111111',
            name:'Nombre del Cliente 1',
            doi: 'DNI',
        },
        {
            id: '22222222',
            name:'Nombre del Cliente 2',
            doi: 'DNI',
        },
        {
            id: '33333333',
            name:'Nombre del Cliente 3',
            doi: 'DNI',
        },
    ])

    const [articleResults, setArticleResults] = useState([
        {
            id: '0001',
            name:'Nombre del articulo 1',
            unitPrice: 10,
            unit: 'Kg.'
        },
        {
            id: '0002',
            name:'Nombre del articulo 2',
            unitPrice: 20,
            unit: 'Kg.'
        },
        {
            id: '0003',
            name:'Nombre del articulo 3',
            unitPrice: 30,
            unit: 'Kg.'
        },
    ])

    const IGV = 18;

    useEffect(() => {
        var newResume = {
            subtotal: 0,
            discounts: 0,
            igv: 0,
            total: 0,
        }

        for (const article of articles) {
            newResume.subtotal += article.unitPrice * article.quantity;
            
            newResume.igv += article.unitPrice * (IGV/100) * article.quantity;
            
            newResume.total += article.unitPrice * (1 + IGV/100) * article.quantity;
        }

        newResume.subtotal = Math.round((newResume.subtotal  + Number.EPSILON) * 100) / 100
        newResume.total = Math.round((newResume.total  + Number.EPSILON) * 100) / 100
        newResume.igv = Math.round((newResume.igv  + Number.EPSILON) * 100) / 100

        setResume(newResume);
    }, [articles])

    const handleClose = () => setShow(false);
    const handleShow = (type) => {
        setSearchType(type)
        setShow(true)
    };

    const handleSearch = () => console.log('search');

    const handleArticles = (article, event) => {
        
        let newArticles = articles.map((art) => {
            if(art.id === article.id) return {...article, quantity: event.target.value}
            else return art;
        });

        setArticles(newArticles);

    };

    const handleArticleResults = (article) => {
        
        let newArticles = articleResults.map((art) => {
            if(art.id === article.id) return {...article, selected: true}
            else return {...art, selected: false};
        });

        setArticleResults(newArticles);

    }

    const handleClientResults = (clientResult) => {
        
        let newClients = clientResults.map((cli) => {
            if(cli.id === clientResult.id) return {...clientResult, selected: true}
            else return {...cli, selected: false};
        });

        setClientResults(newClients);

    }

    const selectClient = (clientResult) => {
        setClient(clientResult)
        setShow(false)
    }

    const addArticle = (article) => {

        let newArticles = []

        if(articles.filter((art) => art.id === article.id).length > 0) newArticles = articles.map((art) => {
            if (art.id === article.id) return {...art, quantity: art.quantity + 1}
            else return art
        })
        
        else newArticles = [...articles, {...article, quantity: 1}];

        setArticles(newArticles);

        setShow(false);

    };

    const deleteArticle = (article) => {
        
        let newArticles = articles.filter((art) => art.id !== article.id);

        setArticles(newArticles);

        setShow(false);

    };

    const handleFactura = () => {
        setDocument({...document, serie: 'F001', number: '12345678', type: 'factura', created: (new Date()).toLocaleDateString('es-PE')})
    }

    const handleBoleta = () => {
        setDocument({...document, serie: 'B001', number: '12345678', type: 'boleta', created: (new Date()).toLocaleDateString('es-PE')})
    }

    const articleElements = (
        articles.map((article) => {
            return (
                <Card className='article p-3'>
                    <Row className='m-0'>
                        <Col className='col col-4 d-flex align-items-center'>
                            <div>
                                {article.id} - {article.name}
                            </div>
                        </Col>
                        <Col className='col col-8'>
                            <Row className='m-0'>
                                <Col className='col col-4 d-flex align-items-center'>
                                    <div className='price'>
                                        Precio Unit.: S/. {article.unitPrice}
                                    </div>
                                </Col>
                                <Col className='col col-4 d-flex align-items-center'>
                                    <Row className='m-0'>
                                        <Col className='col col-6 d-flex align-items-center'>
                                            Cantidad
                                        </Col>
                                        <Col className='col col-6 d-flex align-items-center'>
                                            <Form.Control type="number" id="article-quantity" value={article.quantity} onChange={(event) => handleArticles(article, event)}/>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col className='col col-4 d-flex align-items-center justify-content-end'>
                                    <Row className='m-0'>
                                        <Col className='col d-flex align-items-center'>
                                            <div className='price'>
                                                Valor Venta: S/. {article.unitPrice * article.quantity}
                                            </div>
                                        </Col>
                                        <Col className='col col-auto p-0 d-flex align-items-center'>
                                            <Button>
                                                <Image src={Trash} width={20} height={20} onClick={() => deleteArticle(article)}></Image>
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
            )
        })
    )

    const clientElements = (
        clientResults.map((cli) => {
            return (
                <div className={cli.selected !== undefined && cli.selected ? "card card-cliente card-selected" : "card card-cliente" } onClick={() => handleClientResults(cli)}>
                    <Row className='m-0'>
                        <Col className='d-flex align-items-center'>
                            <div className="text-lg">
                                <strong className="nodo-cliente-codigo">Cliente: </strong>
                                <strong className="nodo-cliente-codigo">{cli.id}</strong>
                                <span className="separator">|</span>
                                <strong className="nodo-cliente-nombre">{cli.name} ({cli.doi})</strong>
                            </div>
                        </Col>
                        {cli.selected !== undefined && cli.selected ? (
                            <Col className='d-flex justify-content-end align-items-center'>
                                <Button onClick={() => selectClient(cli)}>Seleccionar</Button>
                            </Col>
                        )
                        :
                        null}
                    </Row>
                </div>
            )
        })
    )

    const articleSearchElements = (
        articleResults.map((art) => {
            return (
                <div className={art.selected !== undefined && art.selected ? "card card-cliente card-selected" : "card card-cliente" } onClick={() => handleArticleResults(art)}>
                    <Row className='m-0'>
                        <Col>
                            <div className="text-lg">
                                <strong className="nodo-cliente-codigo">Articulo: </strong>
                                <strong className="nodo-cliente-codigo">{art.id}</strong>
                                <span className="separator">|</span>
                                <strong className="nodo-cliente-nombre">{art.name}</strong>
                            </div>
                            <div className="text-lg">
                                <strong className="nodo-cliente-codigo">Precio Unit.: </strong>
                                <strong className="nodo-cliente-codigo">{art.unitPrice}</strong>
                                <span className="separator">|</span>
                                <strong className="nodo-cliente-codigo">Unid. Medida: </strong>
                                <strong className="nodo-cliente-nombre">{art.unit}</strong>
                            </div>
                        </Col>
                        {art.selected !== undefined && art.selected ? (
                            <Col className='d-flex justify-content-end align-items-center'>
                                <Button onClick={() => addArticle(art)}>Agregar</Button>
                            </Col>
                        )
                        :
                        null}
                    </Row>
                </div>
            )
        })
    )

    return (
        <div>
            <div className='p-4'>
                <Row className='d-flex flex-column g-0'>
                    <h2>Modulo de Ventas</h2>
                    <h4>USUARIO - NOMBRE EMPRESA</h4>
                </Row>
                <Card className='p-3 mb-3'>
                    <Row className='m-0 my-3'>
                        <Col className='col col-auto'>
                            <Button onClick={handleFactura}>FACTURA</Button>
                        </Col>
                        <Col className='col col-auto'>
                            <Button onClick={handleBoleta}>BOLETA</Button>
                        </Col>
                        {/* <Col className='col col-2'>
                            <Button>NOTA CREDITO</Button>
                        </Col>
                        <Col className='col col-2'>
                            <Button>NOTA DEBITO</Button>
                        </Col> */}
                    </Row>
                    <Row className='m-0'>
                        <Col className='col col-6'>
                            <Row className='m-0'>
                                <Col className='col col-3'>
                                    <Form.Label htmlFor="client-code">Cliente</Form.Label>
                                    <InputGroup className="mb-3">
                                        <FormControl id="client-code" placeholder="Codigo" value={client.id}/>
                                    </InputGroup>
                                </Col>
                                <Col className='col col-9 d-flex align-content-end'>
                                    <InputGroup
                                        className="mb-3 align-self-end"
                                        style={{
                                        height: 'fit-content'
                                    }}>
                                        <FormControl id="client-doi" placeholder="DOI - Nombre o Razón Social" value={client.doi}/>
                                        <InputGroup.Text
                                            onClick={() => handleShow('client')}
                                            style={{
                                            cursor: 'pointer'
                                        }}>
                                            <Image src={Search} width={20} height={20}></Image>
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col className='col col-6'>
                            <Row className='m-0'>
                                <Col className='col col-6'>
                                    <Form.Label htmlFor="client-serie">Nro. Documento</Form.Label>
                                    <Row className='m-0'>
                                        <Col className='col-4'>
                                            <InputGroup className="mb-3">
                                                <FormControl id="client-serie" placeholder="Serie" value={document.serie} readOnly/>
                                            </InputGroup>
                                        </Col>
                                        <Col>
                                            <InputGroup className="mb-3">
                                                <FormControl id="client-number" placeholder="Numero" value={document.number} readOnly/>
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col className='col col-6'>
                                    <Form.Label htmlFor="transaction-code">Transaccion</Form.Label>
                                    <Row className="m-0 mb-3 align-self-end">
                                        <Col className='col-4'>
                                            <InputGroup className="mb-3">
                                                <FormControl id="transaction-code" placeholder="Codigo"/>
                                            </InputGroup>
                                        </Col>
                                        <Col>
                                            <InputGroup className="mb-3">
                                                <FormControl id="transaction-name" placeholder="Nombre"/>
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className='m-0'>
                        <Col className='col col-6'>
                            <Row className='m-0'>
                                <Col className='col col-3'>
                                    <Form.Label htmlFor="article-code">Articulo</Form.Label>
                                    <InputGroup className="mb-3">
                                        <FormControl id="article-code" placeholder="Codigo"/>
                                    </InputGroup>
                                </Col>
                                <Col className='col col-9 d-flex align-content-end'>
                                    <InputGroup
                                        className="mb-3 align-self-end"
                                        style={{
                                        height: 'fit-content'
                                    }}>
                                        <FormControl id="article-name" placeholder="Nombre del artículo"/>
                                        <InputGroup.Text
                                            onClick={() => handleShow('article')}
                                            style={{
                                            cursor: 'pointer'
                                        }}>
                                            <Image src={Search} width={20} height={20}></Image>
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col className='col col-6'>
                            <Row className='m-0'>
                                <Col className='col col-6'>
                                    <Form.Label htmlFor="article-created">Fecha Emision</Form.Label>
                                    <InputGroup className="mb-3">
                                        <FormControl id="article-created" value={document.created} readOnly/>
                                    </InputGroup>
                                </Col>
                                <Col className='col col-6'>
                                    <Form.Label htmlFor="article-caducated">Fecha Vencimiento</Form.Label>
                                    <DatePicker className='form-control' dateFormat="dd/MM/yyyy" locale="es" selected={document.caducated} onChange={(date) => setDocument({...document, caducated: date})} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>

                <Card>
                    <Card.Header>
                        <h5><strong>Articulos</strong></h5>
                    </Card.Header>
                    <Card.Body className='p-3'>
                        {articleElements}
                        {articles.length === 0 ? (
                            <h6>No se han agregado articulos</h6>
                        ):(null)}
                    </Card.Body>
                </Card>
                <Row className='m-0 d-flex justify-content-end text-end mb-5 mt-5'>
                    <Col className='col col-2'>
                        <strong>Subtotal:</strong> S/ {resume.subtotal}
                    </Col>
                    <Col className='col col-2'>
                        <strong>Dsctos:</strong> S/ {resume.discounts}
                    </Col>
                    <Col className='col col-2'>
                        <strong>I.G.V.:</strong> S/ {resume.igv}
                    </Col>
                    <Col className='col col-2'>
                        <strong>Total:</strong> S/ {resume.total}
                    </Col>
                </Row>
                <Row className='m-0 d-flex justify-content-end'>
                    <Col className='col-auto d-flex justify-content-end'>
                        <Button onClick={() => navigate(ROUTES.INGRESAR_PAGO, {state: {document, client, articles, resume}})}>REGISTRAR PAGO</Button>
                    </Col>
                    <Col className='col-auto d-flex justify-content-end'>
                        <Button onClick={() => navigate(ROUTES.DOCUMENTS_HISTORY)}>CANCELAR</Button>
                    </Col>
                </Row>
            </div>

            <Modal show={show} onHide={handleClose} size="xl" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Búsqueda avanzada de {searchType === 'client' ? 'Clientes' : 'Articulos'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className='m-0'>
                        <InputGroup
                            className="mb-3 align-self-end p-0"
                            style={{
                            height: 'fit-content'
                        }}>
                            <FormControl
                                id="article-name"
                                placeholder="Ingrese el nombre o doi del cliente"/>
                            <InputGroup.Text
                                onClick={handleSearch}
                                style={{
                                cursor: 'pointer'
                            }}>
                                <Image src={Search} width={20} height={20}></Image>
                            </InputGroup.Text>
                        </InputGroup>
                    </Row>
                    <div className="search-results" id="busqueda-clientes">
                        {searchType === 'client' ? clientElements : articleSearchElements}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Aceptar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Sales