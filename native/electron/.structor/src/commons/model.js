export default {
    key: "/",
    children: [
        {
            key: "",
            modelNode: {
                type: 'h3',
                props: {
                    style: {
                        padding: '1em',
                        textAlign: 'center'
                    }
                }
            },
            children: [
                {
                    key: "",
                    modelNode: {
                        type: 'span',
                        text: 'Loading...'
                    }
                }
            ]
        }
    ]
};
