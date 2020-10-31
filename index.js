'use strict'

// Task I

const p = (tagName, options) => {
    let wrapper = document.getElementById('wrapper')
    if(!wrapper) {
        wrapper = document.createElement('div')
        wrapper.id = 'wrapper'
        document.body.appendChild(wrapper)
    }
    const tag = document.createElement(tagName)
    if(options) {
        options.textContent && (tag.textContent = options.textContent)
        options.href && tag.setAttribute('href', options.href)
        wrapper.appendChild(tag)
        
        if (options.id) {
            options.id && (tag.id = options.id)
            document.body.appendChild(tag)
            wrapper
                .childNodes
                .forEach(item => 
                    tag.appendChild(item.cloneNode(true))
                )
            document.body.removeChild(wrapper)
        }
    }  
}


// Task II
const values = {}
let errors = []

const User = {
    email: 'mail@mail.com',
    password: '123123'
}

const validate = (name, value) => {
    switch (name) {
        case 'login': 
            const REGEXP = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
            if(REGEXP.test(value)) {
                return values[name] = value
            }
            return errors.push('Invalid E-mail')
        case 'password':
            if(value) {
                return values[name] = value
            }
    
            return errors.push('Invalid password')
        default: 
            return false
    }
}
const auth = values => {
    errors = []
    if(values.login === User.email) {
        errors = []
        return values.password === User.password 
            ? p('div', {id: 'header'}, [
                p('div', {textContent: 'Привіт!'}),
                p('div', {textContent: ' Базовий приклад SPA без використання сторонніх бібліотек.'}),
                p('a', {href: '#', textContent: 'Перейти на привітання'}),
                p('a', {href: '#', textContent: 'Перейти назад'})
            ])
            : errors.push('Invalid password') 
    } 
    return errors.push('Invalid E-Mail')
}

const handleChange = e => {
    const value = e.target.value
    const name = e.target.name
    validate(name, value)
}

const handleSubmit = () => {
    auth(values)
    console.log(errors)
    if(errors){
        errorMessage.textContent = errors[0]
    }
}


loginInput.onchange = e => handleChange(e)
passwordInput.onchange = e => handleChange(e)

authForm.onsubmit = (e) => {
    e.preventDefault()
    loginInput.value = ''
    passwordInput.value = ''
    handleSubmit()
}