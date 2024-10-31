import './Home.css';

export default function Row({ element, remover }) {
    return (
        <li key={element.id}>
            {element.description}
            <button className='delete-button' onClick={() => {remover(element.id)}}>Delete</button>
        </li>
    )
}