import React from "react";
import PropTypes from 'prop-types';

const CafeMapCard = (props) => {
	const { cafe } = props;

	return (
		<div>
			<p>{ cafe.cafe_name }</p>
		</div>
	);
}

CafeMapCard.propTypes = {
	cafe: PropTypes.object.isRequired
};

export default CafeMapCard;