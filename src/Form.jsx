import React,{useState} from 'react';
import { useFormik } from 'formik';
import basicSchema from './Schema';



const Form = () => {

  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(null);  
  
  
  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      isbn: '',
      pubdate:'',
    },
    validationSchema:basicSchema,
    onSubmit: (values, { resetForm }) => {
        if (isEditing) {
          const updatedItems = items.map((item, index) => 
            index === currentItemIndex ? values : item
          );
          setItems(updatedItems);
          setIsEditing(false);
        } else {
          setItems([...items, values]);
        }
        resetForm();
      },
  });

  const handleEdit = (index) => {
    setIsEditing(true);
    setCurrentItemIndex(index);
    formik.setValues(items[index]);
  };

  const handleDelete = (index) => {
    const filteredItems = items.filter((_, i) => i !== index);
    setItems(filteredItems);
  };




  return (
    <div className='container'>
    <form onSubmit={formik.handleSubmit}>
        <div>
            <label htmlFor="title">Title</label>
             <input
                id="title"
                name="title"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title ? (
                <div className="error">{formik.errors.title}</div>
            ):null}
        </div>
        <div>
            <label htmlFor="author">Author</label>
                <input
                id="author"
                name="author"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.author}
                />
            {formik.touched.author && formik.errors.author ? (
                <div className="error">{formik.errors.author}</div>
            ):null}                
        </div>
        <div>
            <label htmlFor="isbn">ISBN No.</label>
            <input
              id="isbn"
              name="isbn"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.isbn}
            />
            {formik.touched.isbn && formik.errors.isbn ? (
                <div className="error">{formik.errors.isbn}</div>
            ):null}  
        </div>

        <div>
        <label htmlFor="pubdate">Publication Date</label>
            <input
               id="pubdate"
               name="pubdate"
               type="date"
               onChange={formik.handleChange}
               value={formik.values.pubdate}
            />
            {formik.touched.pubdate && formik.errors.pubdate ? (
                <div className="error">{formik.errors.pubdate}</div>
            ):null}  
        </div>
      <button type="submit">Submit</button>
    </form>

    <ul>
        {items.map((item, index) => (
          <li key={index}>
            <b>Book:</b>{item.title} - <b>Author:</b>{item.author}
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
    </ul>
    </div>
  );
};

export default Form;