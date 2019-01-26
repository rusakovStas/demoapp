import React from "react";
import {
	MDBContainer,
	Card,
	CardTitle,
	MDBRow,
	MDBCol,
	Jumbotron
} from "mdbreact";
import "./User.css";
import PropTypes from "prop-types";
import AddUser from "./Modal/Add";
import DeleteConfirm from "./Modal/Delete";

class UserForm extends React.Component {
	state = {};

	render() {
		return (
			<div>
				<MDBContainer>
					<Jumbotron className="mt-3">
						<h1 className="display-3">Hello, admin!</h1>
						<p className="lead">
							This is your personal page where you can create and
							delete users
						</p>
					</Jumbotron>
					<AddUser submit={this.props.add} />
					<MDBContainer>
						<MDBRow>
							{this.props.users.map(user => (
								<MDBCol md="4" className="padding-10">
									<Card
										body
										key={user.user_id}
										outline
										color="secondary"
										className="text-center"
									>
										<CardTitle tag="h2">
											{user.username}
										</CardTitle>
										<DeleteConfirm
											color="danger"
											submit={() =>
												this.props.delete(user)
											}
											enabled={
												!!user.roles.find(
													element =>
														element.role !== "admin"
												)
											}
										/>
									</Card>
								</MDBCol>
							))}
						</MDBRow>
					</MDBContainer>
				</MDBContainer>
			</div>
		);
	}
}

UserForm.propTypes = {
	delete: PropTypes.func.isRequired,
	add: PropTypes.func.isRequired,
	users: PropTypes.arrayOf(
		PropTypes.shape({
			user_id: PropTypes.number.isRequired,
			username: PropTypes.string.isRequired,
			roles: PropTypes.arrayOf(
				PropTypes.shape({
					role: PropTypes.string.isRequired
				})
			).isRequired
		})
	).isRequired
};

export default UserForm;
