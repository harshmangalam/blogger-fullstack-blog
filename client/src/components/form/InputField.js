export default function InputField({
	field,
	type="text",
	autocomplete = "",
	required = false,
	label,
	error="",
	handleChange,
	value
}) {
	return (
		<div>
			<label htmlFor="email" className="block text-gray-700">
				{label}
			</label>

			<div className="my-2">
				<input
					value={value}
					id={field}
					name={field}
					type={type}
					autoComplete={autocomplete}
					required={required}
					onChange = {e=>handleChange(e.target.value)}
					
				/>
				<div className="text-red-600">
					{error && <small>{error}</small>}
				</div>
			</div>
		</div>
	);
}
