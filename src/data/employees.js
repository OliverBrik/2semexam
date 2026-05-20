// Import employee profile images
import dustinImg from '../assets/employeeimgs/dustin-profilepic.jpg'
import lewisImg from '../assets/employeeimgs/lewis-profilepic.jpg'
import peterImg from '../assets/employeeimgs/peter-profileimg.png'
import idaImg from '../assets/employeeimgs/ida-profilepic.png'

// Data for medarbejdere vises både på Kontakt og Om os siden
export const employees = [
  {
    name: 'Dustin Chwalek',
    role: 'Communication Manager',
    description: '',
    phone: '+45 24 25 36 70',
    email: 'dusch@toender.dk',
    linkedin: 'https://www.linkedin.com/in/dustin-chwalek-720018206/',
    image: dustinImg,
  },
  {
    name: 'Lewis C. Bardt',
    role: 'Project Manager',
    description: '',
    phone: '+45 21 77 59 16',
    email: 'lecba@toender.dk',
    linkedin: 'https://www.linkedin.com/in/lewisbardt/',
    image: lewisImg,
  },
  {
    name: 'Peter Engel-Andreasen',
    role: 'Business Director',
    description: 'Tønder Erhvervsråd',
    phone: '+45 30 65 60 60',
    email: 'peeng@toender.dk',
    linkedin: 'https://www.linkedin.com/in/peter-engel-andreasen-0a4a6b1a9/',
    image: peterImg,
  },
  {
    name: 'Ida Mahler Høeg',
    role: 'Administration and Finance Coordinator',
    description: '',
    phone: '+45 30 61 96 18',
    linkedin: 'https://www.linkedin.com/in/ida-mahler-høeg-0a4a6b1a9/',
    email: 'idmho@toender.dk',
    image: idaImg,
  },
]
