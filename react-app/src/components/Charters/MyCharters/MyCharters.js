import "./MyCharters.css";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Modal } from "../../../context/Modal";
import EditForm from "./EditForm/EditForm";
import CharterRow from "./CharterRow";
import moneyFormatter from "../../../utils/currency"

const MyCharters = () => {
  const dispatch = useDispatch();
  const charters = useSelector((state) => Object.values(state?.charters));
  const { id } = useParams();
  const sessionUser = useSelector((state) => state.session.user);

  const yourCharters = charters.filter(
    (charter) => charter.user_id === parseInt(id)
  );

  // const [showCharterModal, setShowCharterModal] = useState(false);

  if (yourCharters.length) {
    return (
		<div className="my-charters-container">
			<h1>My Charters</h1>
			{yourCharters.map((charter) => {
				return (
					<div>
						<CharterRow
							charter={charter}
							estateId={charter.estate_id}
						/>
					</div>
				);
			})}
		</div>
	);
  } else {
    return (
		<div className="my-charters-container">
			<h1>My Charters</h1>
			<div className='no-charter-header'>
					<h2>We don't see any charters listed from your account.</h2>
					<h3>
						Browse the estates collection to find your next dream charter.
					</h3>
				</div>
		</div>
	);
  }




//   return (
//     <div className="my-charters-container">
//       <h1>My Charters</h1>
//       {yourCharters.map((charter) => {
//         return (
//           <div>
//             <CharterRow charter={charter} estateId={charter.estate_id} />
//           </div>
//         );
//       })}
//     </div>
//   );
};

export default MyCharters;
