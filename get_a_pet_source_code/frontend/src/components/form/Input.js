import styles from './Input.module.css';

function InputDeviceInfo({type, text, name, placeholder, hadleOnChange, value, multiple}) {
    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <input type={type} name={name} id={name} placeholder={placeholder} onChange={hadleOnChange} value={value} {...(multiple) ? {multiple} : ''}/>
        </div>
    );
}

export default InputDeviceInfo;