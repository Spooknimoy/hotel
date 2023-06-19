import Pagina from '@/components/Pagina'
import React, { useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { BsCheckLg } from 'react-icons/bs'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { mask } from 'remask'
import cddonoValidator from '@/validator/cddonoValidator'

const form = () => {

    const { push, query } = useRouter()
    const { register, handleSubmit, setValue } = useForm()

    function handleChange(event){ 
        const name = event.target.name
        const valor = event.target.value
        const mascara = event.target.getAttribute('mask')
        setValue(name, mask(valor, mascara));
    }

    useEffect(() => {
        if (query.id) {
            const id = query.id
            const cddono = JSON.parse(localStorage.getItem('cddono'))
            const cddonos = cddono[id]

            for (let atributo in cddono) {
                setValue(atributo, cddono[atributo])
            }
        }
    }, [query.id])

    function salvar(dados) {
        const cddono = JSON.parse(localStorage.getItem('cddono')) || []
        cddono.splice(query.id, 1, dados)
        localStorage.setItem('cddono', JSON.stringify(cddono))
        push('/cddono')
    }

    return (
        <Pagina>
            <Form>
                <Form.Group className="mb-3" controlId="nome">
                    <Form.Label>Nome: </Form.Label>
                    <Form.Control type="text" {...register('nome')} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="NomedoseuPet">
                        <Form.Label>Nome Do Seu Pet: </Form.Label>
                        <Form.Control type="text" {...register('NomedoseuPet')} />
                    </Form.Group>
                    
                <Form.Group className="mb-3" controlId="cpf">
                    <Form.Label>CPF: </Form.Label>
                    <Form.Control 
                    mask='999.999.999-99'
                    maxLength={14}
                    isInvalid={errors.cpf}
                    type="text" 
                    {...register('cpf', cddonoValidator.cpf)} 
                    onChange={handleChange}/>
                    {
                        errors.cpf &&
                        <p className='mt-1 text danger'>{errors.cpf.message}</p>
                    }
                </Form.Group>

                <Form.Group className="mb-3" controlId="rg">
                    <Form.Label>RG: </Form.Label>
                    <Form.Control type="text" {...register('rg')} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>E-mail: </Form.Label>
                    <Form.Control type="text" {...register('email')} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="telefone">
                    <Form.Label>Telefone: </Form.Label>
                    <Form.Control type="text" {...register('telefone')} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="cep">
                    <Form.Label>CEP: </Form.Label>
                    <Form.Control type="text" {...register('cep')} />
                </Form.Group>


                <Form.Group className="mb-3" controlId="logadouro">
                    <Form.Label>Logadouro: </Form.Label>
                    <Form.Control type="text" {...register('logadouro')} />
                </Form.Group>



                <Form.Group className="mb-3" controlId="complemento">
                    <Form.Label>Complemento: </Form.Label>
                    <Form.Control type="text" {...register('complemento')} />
                </Form.Group>



                <Form.Group className="mb-3" controlId="numero">
                    <Form.Label>Numero: </Form.Label>
                    <Form.Control type="text" {...register('numero')} />
                </Form.Group>



                <Form.Group className="mb-3" controlId="bairro">
                    <Form.Label>Bairro: </Form.Label>
                    <Form.Control type="text" {...register('bairro')} />
                </Form.Group>

                <div className='text-center'>
                    <Button variant="success" onClick={handleSubmit(salvar)}>
                        <BsCheckLg className="me-2" />
                        Salvar
                    </Button>
                    <Link className="ms-2 btn btn-danger" href="/cddono">
                        <AiOutlineArrowLeft className="me-2" />
                        Voltar
                    </Link>
                </div>
            </Form>
        </Pagina>
    )
}

export default form