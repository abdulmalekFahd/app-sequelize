var models = require('../models')

var store = async function (req, res, next) {
    var result = {
        success: true,
        massages: [],
        data: {}
    }
    var name = req.body.name.trim()
    var email = req.body.email.trim()
    var phone = req.body.phone.trim()
    var gender = req.body.gender
    var password = req.body.password.trim()

    if (name.length < 3) {
        result.success = false
        result.massages.push('Please check your name')
    }
    if (email.length < 3) {
        result.success = false
        result.massages.push('Please check your email')
    }
    if (phone.length < 3) {
        result.success = false
        result.massages.push('Please check your phone')
    }
    if (password.length < 3) {
        result.success = false
        result.massages.push('Please check your password')
    }
    if (gender != '0' && gender != '1') {
        result.success = false
        result.massages.push('Please check your gender')
    }
    if (!result.success) {
        res.send(result)
        return
    }
    var newMember = await models.Member.create({
        name: name,
        email: email,
        phone: phone,
        gender: gender,
        password: password
    })
    result.data = newMember
    console.log(newMember)
    result.massages.push('User has been create successfully')
    res.send(result)
}

var show = async function (req, res, next) {
    var result = {
        success: true,
        massages: [],
        data: {}
    }
    var id = req.params.id
    var member = await models.Member.findByPk(id)
    if (member) {
        result.data = member
    } else {
        res.status(404)
        result.success = false
        result.massages.push('Please provide a valid ID')
    }
    res.send(result)
}

var index = async function (req, res, next) {
    var result = {
        success: true,
        massages: [],
        data: {}
    }
    var members = await models.Member.findAll()
    if (Array.isArray(members)) {
        result.data = members
    } else {
        res.status(404)
        res.success = false
        res.massages.push('Please try again later')
    }
    res.send(result)
}

var destroy = async function (req, res, next) {
    var result = {
        success: true,
        massages: [],
        data: {}
    }
    var id = req.params.id
    var deleted = await models.Member.destroy({
        where: {
            id: id
        }
    })
    if (deleted) {
        // result.data = member
    } else {
        res.status(404)
        result.success = false
        result.massages.push('Can not delete it')
    }
    res.send(result)
}

var update = async function (req, res, next) {
    var result = {
        success: true,
        massages: [],
        data: {}
    }
    var name = req.body.name.trim()
    var email = req.body.email.trim()
    var phone = req.body.phone.trim()
    var gender = req.body.gender
    var password = req.body.password.trim()

    if (name.length < 3) {
        result.success = false
        result.massages.push('Please check your name')
    }
    if (email.length < 3) {
        result.success = false
        result.massages.push('Please check your email')
    }
    if (phone.length < 3) {
        result.success = false
        result.massages.push('Please check your phone')
    }
    if (password.length < 3) {
        result.success = false
        result.massages.push('Please check your password')
    }
    if (gender != '0' && gender != '1') {
        result.success = false
        result.massages.push('Please check your gender')
    }
    if (!result.success) {
        res.send(result)
        return
    }
    var id = req.params.id
    var updatedMember = await models.Member.update({
        name: name,
        email: email,
        phone: phone,
        gender: gender,
        password: password
    }, {
        where: {
            id
        }
    })
    result.data = updatedMember
    console.log(updatedMember)
    result.massages.push('Member has been updated successfully')
    res.send(result)
}

var login = async function(req, res, next){
    var result = {
        success: true,
        massages: [],
        data: {}
    }
    var email = req.body.email.trim()
    var password = req.body.password.trim()
    var loggedMember = await models.Member.findOne({
        where: {
            email : email,
            password : password
        }
    })
    if (loggedMember) {
        result.data = loggedMember     
    }else{
        result.success = false
        result.massages.push('Wrong email or password')
    }
    res.send(result)
}

module.exports = {
    store,
    show,
    index,
    destroy,
    update,
    login
}