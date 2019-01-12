import React, { Component } from 'react';
import { connect } from 'react-redux';

// A class based component because has helper functions
// to determine what content to display  
class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return <li><a href="/auth/google">Login with Google</a></li>
            default:
                return <li><a>Logout</a></li>

        }
    }
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <a className="left brand-logo">
                        Emaily
                    </a>
                <ul className="right">
                    { this.renderContent() }
                </ul>
                </div>
            </nav>
        );
    }
}

// function mapStateToProps(state) {
//     return {
//         auth: state.auth
//     };
// }

// After destructuring
// argument is from state, so auth is a property of the state 
// function mapStateToProps({ auth }) {
//     return { auth: auth };
// }

function mapStateToProps({ auth }) {
    return { auth };
}
export default connect(mapStateToProps) (Header);