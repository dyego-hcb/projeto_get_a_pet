import {Link} from 'react-router-dom';

import Input from '../../form/Input';
import styles from '../../form/Form.module.css';

function Register(){
    function handleChange(e){}

    return (
        <section className={styles.form_container}>
            <h1>Registrar</h1>
            <form>
                <Input 
                text="Nome"
                type="text"
                name="name"
                placeholder="Digite o seu nome"
                hadleOnChange={handleChange}/>

                <Input 
                text="Telefone"
                type="text"
                name="phone"
                placeholder="Digite o seu telefone"
                hadleOnChange={handleChange}/>

                <Input 
                text="E-mail"
                type="email"
                name="email"
                placeholder="Digite o seu email"
                hadleOnChange={handleChange}/>

                <Input 
                text="Senha"
                type="password"
                name="password"
                placeholder="Digite a sua senha"
                hadleOnChange={handleChange}/>

                <Input 
                text="Confirmaçāo de senha"
                type="password"
                name="confirmpassword"
                placeholder="Confirme a sua senha"
                hadleOnChange={handleChange}/>

                <input type='submit' value="Cadastrar" />
            </form>
            <p>
                Já tem uma conta? <Link to='/login'>Clique aqui.</Link>
            </p>
        </section>
    );
}

export default Register;