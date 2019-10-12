import React from "react";

const CafeMapCard = (props) => {
	const { cafe } = props;

	const handleClick = (e) => {
		props.toggleShowPage(cafe);
	}

	return (
		<div>
			<p>{cafe.name}</p>
			<button onClick={handleClick}>See More</button>
		</div>
	);
}

export default CafeMapCard;