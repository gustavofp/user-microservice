import User from '../model/user.model'
import CONSTANTS from '../config/constants.config';

export const save = (req, res) => {
    if (!req || !req.body)
        return res.status(400).send({ response: CONSTANTS.ERROR_INVALID_REQUEST });

    const user = new User({
        email: req.body.email,
        username: req.body.username,
        name: req.body.name,
        password: req.body.password,
        profile_pic: req.body.profile_pic,
        roles: req.body.roles,
        subroles: req.body.subroles,
        facebook: {
            id: req.body.facebook ? req.body.facebook.id : '',
            token: req.body.facebook ? req.body.facebook.token :'',
            email: req.body.facebook ? req.body.facebook.email : '',
            name: req.body.facebook ? req.body.facebook.name : ''
        },
        google: {
            id: req.body.google ? req.body.google.id : '',
            token: req.body.google ? req.body.google.token : '',
            email: req.body.google ? req.body.google.email : '',
            name: req.body.google ? req.body.google.name : ''
        }
    })

    user.save(err => {

        if (err) return res.status(400).send({ response: CONSTANTS.ERROR_DUPLICATED_KEY })

        return res.status(200).send({ response: user });

    });
}

export const login = (req, res) => {
    if (!req || !req.body)
        return res.status(400).send({ response: CONSTANTS.ERROR_INVALID_REQUEST });

    User.findOne(
        { username: req.body.username, password: req.body.password },
        (err, user) => {
            if (err) return res.status(400).send({ response: CONSTANTS.ERROR_USER_NOT_FOUND })

            return res.status(200).send({ response: 'Usuário logado'})
        }
    )

}