import React from "react";
import {
	MDBAlert,
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBInput,
	MDBBtn,
	MDBCard,
	MDBCardBody
} from "mdbreact";
import PropTypes from "prop-types";
import InlineError from "../commons/InlineError";

class LoginForm extends React.Component {
	state = {
		data: {
			email: "",
			password: ""
		},
		loading: false,
		errors: {}
	};

	onChange = e =>
		this.setState({
			data: { ...this.state.data, [e.target.name]: e.target.value }
		});

	onSubmit = () => {
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			this.props.submit(this.state.data).catch(err => {
				this.setState({
					errors: { global: err.response.data.error },
					loading: false
				});
			});
		}
	};

	validate = data => {
		const errors = {};
		if (!data.email) errors.email = "Can't be blank";
		if (!data.password) errors.password = "Can't be blank";
		return errors;
	};

	render() {
		const { data, errors, loading } = this.state;
		return (
			<MDBContainer>
				<MDBRow className="d-flex justify-content-center mt-5">
					<MDBCol md="5">
						<MDBCard className="mt-5">
							<MDBCardBody>
								<form>
									<p className="h4 text-center py-4">
										Sign in
									</p>
									<div className="grey-text">
										{errors.global && (
											<MDBAlert color="danger">
												{errors.global}
											</MDBAlert>
										)}
										<MDBInput
											label="Type your username"
											icon="envelope"
											group
											type="text"
											validate
											error="wrong"
											success="right"
											id="email"
											name="email"
											value={data.email}
											onChange={this.onChange}
											disabled={loading}
										/>
										{errors.email && (
											<InlineError text={errors.email} />
										)}
										<MDBInput
											label="Type your password"
											icon="lock"
											group
											id="password"
											name="password"
											type="password"
											value={data.password}
											onChange={this.onChange}
											disabled={loading}
										/>
										{errors.password && (
											<InlineError
												text={errors.password}
											/>
										)}
									</div>
									<div className="text-center">
										<MDBBtn onClick={this.onSubmit}>
											{loading && (
												<span
													className="spinner-border spinner-border-sm"
													role="status"
													aria-hidden="true"
												/>
											)}
											Login
										</MDBBtn>
									</div>
								</form>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		);
	}
}

LoginForm.propTypes = {
	submit: PropTypes.func.isRequired
};

export default LoginForm;
