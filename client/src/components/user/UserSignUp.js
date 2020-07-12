import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { signUp } from '../../actions';

class UserSignUp extends React.Component {
	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div
					style={{
						color: '#770000',
					}}
				>
					<i className="ui icon exclamation circle" />
					{error}
				</div>
			);
		}
	}

	renderInput = ({ input, label, type, meta }) => {
		const classes = `field ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className={classes}>
				<label>{label}</label>
				<input
					{...input}
					placeholder={label}
					type={type}
					autoComplete="off"
				/>
				{this.renderError(meta)}
			</div>
		);
	};

	renderSubmitError(error) {
		if (error) {
			return (
				<h3
					style={{
						color: '#770000',
					}}
				>
					<i className="ui icon exclamation circle" />
					{error && <strong>{error}</strong>}
				</h3>
			);
		}
	}

	onSubmit = (formValues) => {
		return new Promise((resolve) => setTimeout(resolve, 1)).then(
			async () => {
				const error = await this.props.signUp(formValues);

				if (error) {
					if (error.response.status === 400) {
						console.log(error.response);

						if (error.response.data.errors) {
							if (
								error.response.data.errors.email.properties
									.message === 'Given Email is invalid!'
							) {
								throw new SubmissionError({
									_error: 'Invalid email',
								});
							}
						} else {
							if (error.response.data.name === 'MongoError') {
								if (error.response.data.code === 11000) {
									throw new SubmissionError({
										_error: 'Email already in use!',
									});
								}
							}
						}
					}
				}
			}
		);
	};

	render = () => {
		const { error, handleSubmit, pristine, reset, submitting } = this.props;
		return (
			<form
				className="ui form error"
				onSubmit={handleSubmit(this.onSubmit)}
			>
				<Field
					name="name"
					type="text"
					component={this.renderInput}
					label="Name"
				/>
				<Field
					name="email"
					type="text"
					component={this.renderInput}
					label="Email"
				/>
				<Field
					name="age"
					type="number"
					component={this.renderInput}
					label="Age"
				/>
				<Field
					name="password"
					type="password"
					component={this.renderInput}
					label="Password"
				/>
				<div>
					{this.renderSubmitError(error)}
					<div>
						<button
							className="ui button primary"
							type="submit"
							disabled={submitting}
						>
							Create Account
						</button>

						<button
							className="ui button red"
							type="button"
							disabled={pristine || submitting}
							onClick={reset}
						>
							Clear Values
						</button>
					</div>
				</div>
			</form>
		);
	};
}

const validate = (formValues) => {
	const errors = {};

	if (!formValues.name) {
		errors.name = 'You must enter a name';
	}

	if (formValues.age) {
		if (isNaN(formValues.age)) {
			errors.age = 'Age must be a number';
		} else if (formValues.age < 0) {
			errors.age = 'Age must not be negative';
		}
	}

	if (!formValues.email) {
		errors.email = 'You must enter an email';
	}

	if (!formValues.password) {
		errors.password = 'You must enter a password';
	} else if (formValues.password.length < 7) {
		errors.password = 'Password must have length atleast 7';
	} else if (formValues.password.toLowerCase().includes('password')) {
		errors.password = 'It must not contain "password"';
	}

	return errors;
};

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = {
	signUp,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	reduxForm({
		form: 'SignUp',
		validate: validate,
	})(UserSignUp)
);
