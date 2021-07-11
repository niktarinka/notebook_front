import React, {Component} from 'react'
// import {Alert, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {withRouter} from 'react-router-dom';
import axios from "axios";
import {connect} from 'react-redux'
// import {setUserToken} from "../../store/actions/actions";

class UserComponent extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         user_data: {},
    //         authentication: false,
    //     };
    // }

    // async componentDidMount() {
    //     await axios.post(`http://127.0.0.1:8000/api/user/get_data/`, {}, {
    //         headers: {'Authorization': `Token ${this.props.userToken}`}
    //     })
    //         .then(res => {
    //             this.setState({
    //                 user_data: res.data,
    //                 authentication: true,
    //             })
    //         })
    //         .catch(error => {
    //             this.setState({
    //                 authentication: false,
    //             })
    //         })
    //
    //     console.log(this.state);
    // }

    render() {
        let html = <div>
            ------
        </div>

        if (this.props.authentication) {
            html = <div>
                ++++++
            </div>
        }

        return (html)
    }
}


// const mapDispatchToProps = (dispatch) => {
//     return {
//         setUserTokenAction: (token) => dispatch(setUserToken(token)),
//     }
// }

const mapStateToProps = (state) => ({
    authentication: state.user.authentication
})
export default connect(mapStateToProps)(withRouter(UserComponent));


// export default connect(null, mapDispatchToProps)(withRouter(UserComponent));