import React from "react";
import {
    Collapse,
    MDBNavbar,
    MDBNavbarToggler,
    MDBNavbarBrand,
    NavbarNav,
    MDBNavItem,
    MDBNavLink
} from "mdbreact";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import * as actions from "../../actions/auth";

class TopNavigationBar extends React.Component {
    state = {};

    toggle = () => this.setState({ isOpen: !this.state.isOpen });

    render() {
        const { logout } = this.props;
        return (
            <MDBNavbar color="light" light expand="md" className="mb-2">
                <MDBNavbarBrand href="/home">Home</MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.toggle} />
                <Collapse
                    id="navbarCollapse3"
                    isOpen={this.state.isOpen}
                    navbar
                >
                    <NavbarNav right>
                        {this.props.hasRoleAdmin && (
                            <MDBNavItem>
                                <MDBNavLink to="/admin">Admin</MDBNavLink>
                            </MDBNavItem>
                        )}
                        <MDBNavItem>
                            <MDBNavLink to="/" onClick={() => logout()}>
                                logout
                            </MDBNavLink>
                        </MDBNavItem>
                    </NavbarNav>
                </Collapse>
            </MDBNavbar>
        );
    }
}

TopNavigationBar.propTypes = {
    logout: PropTypes.func.isRequired,
    hasRoleAdmin: PropTypes.bool.isRequired
};

function mapStateToProps(store) {
    return {
        hasRoleAdmin:
            !!store.user.roles &&
            !!store.user.roles.find(element => element === "ROLE_ADMIN")
    };
}

export default connect(
    mapStateToProps,
    { logout: actions.logout }
)(TopNavigationBar);
