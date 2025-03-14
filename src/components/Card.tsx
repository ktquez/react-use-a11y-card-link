import { useA11yCardLink } from '../../lib/'

interface CourseProps {
  id: number
  title: string
  description: string
}

interface CardProps {
  course: CourseProps;
}

const style = {
  width: '300px',
  border: '1px solid #ccc',
  padding: '1rem',
  cursor: 'pointer'
}

export default function Card({ course }: CardProps) {
  const { props } = useA11yCardLink({
    onNavigate: (href) => (window.location.href = href),
  });

  return (
    <div {...props} style={style} className="card">
      <h2>
        <a href={`/course/${course.id}`}>{course.title}</a>
      </h2>
      <p>{course.description}</p>
    </div>
  );
};
