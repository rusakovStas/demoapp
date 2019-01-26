import React from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    MDBAlert,
    MDBInput
} from "mdbreact";
import PropTypes from "prop-types";
import InlineError from "../../commons/InlineError";

class AddUser extends React.Component {
    state = {
        data: {
            username: "",
            password: ""
        },
        open: false,
        loading: false,
        errors: {}
    };

    close = () => this.setState({ open: false });

    onChange = e =>
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });

    show = val => this.setState({ open: val, errors: {} });

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this.props
                .submit(this.state.data)
                .catch(err => {
                    this.setState({
                        errors: { global: err.response.data.message }
                    });
                    this.setState({ loading: false });
                })
                .finally(() => {
                    if (!this.state.errors.global)
                        this.setState({ open: false });
                    this.setState({ loading: false });
                });
        }
    };

    validate = data => {
        const errors = {};

        if (!data.username) errors.username = "It's can't be blanck";
        if (!data.password) errors.password = "It's can't be blanck";

        return errors;
    };

    render() {
        const { data, errors, open } = this.state;
        return (
            <div>
                <Button block color="primary" onClick={() => this.show(true)}>
                    Add new user
                </Button>
                <Modal isOpen={open} toggle={() => this.show(!open)} centered>
                    <ModalHeader toggle={() => this.show(!open)}>
                        Create new user
                    </ModalHeader>
                    {errors.global && (
                        <MDBAlert color="danger">{errors.global}</MDBAlert>
                    )}
                    <ModalBody>
                        <form>
                            <MDBInput
                                label="username"
                                type="text"
                                name="username"
                                id="username"
                                placeholder="User name"
                                onChange={this.onChange}
                                value={data.name}
                                error={errors.username}
                                disabled={this.state.loading}
                            />
                            {errors.username && (
                                <InlineError text={errors.username} />
                            )}
                            <MDBInput
                                label="password"
                                type="text"
                                name="password"
                                id="password"
                                placeholder="User password"
                                onChange={this.onChange}
                                value={data.password}
                                error={errors.password}
                                disabled={this.state.loading}
                            />
                            {errors.password && (
                                <InlineError text={errors.password} />
                            )}
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="success"
                            disabled={this.state.loading}
                            onClick={this.onSubmit}
                        >
                            {this.state.loading && (
                                <span
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            )}
                            Add
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

AddUser.propTypes = {
    submit: PropTypes.func.isRequired
};

export default AddUser;
