import React, { useEffect, useState } from 'react';
import * as FirestoreService from '../../../services/firestore';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';

function ItemList(props) {

    const { gameDocId } = props;

    const [ actions, setActions ] = useState([]);
    const [ error, setError ] = useState();

    // Use an effect hook to subscribe to the game action stream and
    // automatically unsubscribe when the component unmounts.
    useEffect(() => {
        const unsubscribe = FirestoreService.streamGameActions(gameDocId, {
            next: querySnapshot => {
                const updatedActions = querySnapshot.docs.map(docSnapshot => docSnapshot.data());
                setActions(updatedActions);
            },
            error: () => setError('grocery-list-item-get-fail')
        });
        return unsubscribe;
    }, [gameDocId, setActions]);

    const actionElements = actions
        .map((action, i) => <div key={i}>{action.name}</div>);

    return (
        <div>
            <ErrorMessage errorCode={error}></ErrorMessage>
            <div>{actionElements}</div>
        </div>
    );
}

export default ItemList;