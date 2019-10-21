import React from "react";

const CafeMapCard = (props) => {
	const { cafe } = props;

	return (
		<div>
			<p>{ cafe.cafe_name }</p>
		</div>
	);
}

export default CafeMapCard;