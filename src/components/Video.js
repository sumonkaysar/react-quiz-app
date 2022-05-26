import classes from '../styles/Video.module.css';

export default function Video({ title, id, noq }) {
    // eslint-disable-next-line no-constant-condition
    return { noq } > 0 ? (
        <div className={classes.video}>
            <img src={`http://img.youtube.com/vi/${id}/maxresdefault.jpg`} alt={title} />
            <p>{title}</p>
            <div className={classes.qmeta}>
                <p>{noq}</p>
                {/* <Link to="/">a</Link> */}
                <p>Total points : {noq * 5}</p>
            </div>
        </div>
    ) : (
        <div className={classes.video}>
            <img src={`http://img.youtube.com/vi/${id}/maxresdefault.jpg`} alt={title} />
            <p>{title}</p>
            <div className={classes.qmeta}>
                <p>{noq}</p>
                <p>Total points : {noq * 5}</p>
            </div>
        </div>
    );
}
