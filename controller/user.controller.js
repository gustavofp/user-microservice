import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../model/user.model';
import config from '../config/auth.config'
import CONSTANTS from '../constants/error.constants';

export const save = (req, res) => {
    if (!req || !req.body)
        return res.status(400).send({ response: CONSTANTS.ERROR_INVALID_REQUEST });

    const hashedPassword = bcrypt.hashSync(req.body.password, 8)

    const user = createUserModel({ ...req.body, password: hashedPassword });

    user.save(err => {

        if (err) return res.status(400).send({ response: CONSTANTS.ERROR_DUPLICATED_KEY })

        const token = createToken(user._id, config.secret);

        return res.status(200).send({ user, token, auth: true });

    });
}

export const login = (req, res) => {
    if (!req || !req.body)
        return res.status(400).send({ response: CONSTANTS.ERROR_INVALID_REQUEST });

    User.findOne(
        { username: req.body.username },
        (err, user) => {

            if (err) return res.status(400).send({ response: CONSTANTS.ERROR_USER_NOT_FOUND })

            bcrypt.compare(req.body.password, user.password)
            .then( valid => {

                if (!valid) return res.status(400).send({ response: CONSTANTS.ERROR_USER_NOT_FOUND })

                const token = createToken(user._id, config.secret);

                return res.status(200).send({ user, token, auth: true })
            })
        }
    )

}

export const verifyToken = (req, res) => {

    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    validateToken(token)
    .then(token => {
        res.status(200).send({ auth: true, token })
    })
    .catch(error => {
        res.status(500).send({ auth: false, error })
    })
}

const validateToken = async (token) => {
    return await jwt.verify(token, config.secret);
}


const createUserModel = (model) => {
    return new User({
        email: model.email,
        username: model.username,
        name: model.name,
        password: model.password,
        profile_pic: model.profile_pic,
        roles: model.roles,
        subroles: model.subroles,
        facebook: {
            id: model.facebook ? model.facebook.id : '',
            token: model.facebook ? model.facebook.token :'',
            email: model.facebook ? model.facebook.email : '',
            name: model.facebook ? model.facebook.name : ''
        },
        google: {
            id: model.google ? model.google.id : '',
            token: model.google ? model.google.token : '',
            email: model.google ? model.google.email : '',
            name: model.google ? model.google.name : ''
        }
    })
}

const createToken = (id, secret) => {
    return jwt.sign({ id }, secret, { expiresIn: 86400})
}