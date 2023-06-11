import e from 'cors'
import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const Pool = require('pg').Pool


const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'admin',
    database: 'HR',
    port: 5432
})

const app = express()

app.use(express.json())

const port = process.env.PORT || 3003

app.listen(port, () => {console.log('Server berjalan di port '+port)})

//regions
app.get('/region',(req,res)=>{
    pool.query('select * from regions',
    [],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rows)
    })
})

app.get('/region/:id',(req,res)=>{
    const {id} = req.params
    pool.query('select * from regions where region_id = $1',
    [id],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rows)
    }
    )
})

app.post('/region',(req,res)=>{
    const {name} = req.body
    pool.query('insert into regions(region_name) values ($1)',
    [name],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rowCount)
    }
    )
})

app.put('/region/:id',(req,res)=>{
    const {id} = req.params
    const {name} = req.body
    pool.query('update regions set region_name=$2 where region_id = $1',
    [id,name],
    (error,result)=>{
        if(error){
            throw error
        }
        res.json(result.rowCount)
    }
    )
})

app.delete('/region/:id',(req,res)=>{
    const {id} = req.params
    pool.query('delete from regions where region_id = $1',
    [id],
    (error,result)=>{
        if(error){
            throw error
        }
        res.json(result.rowCount)
    }
    )
})

//countries
app.get('/country',(req,res)=>{
    pool.query('select * from countries',
    [],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rows)
    })
})

app.get('/country/:id',(req,res)=>{
    const {id} = req.params
    pool.query('select * from countries where country_id = upper($1)',
    [id],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rows)
    }
    )
})

app.post('/country',(req,res)=>{
    const {id} =req.body
    const {name} = req.body
    const {reg_id} = req.body
    pool.query('insert into countries(country_id, country_name, region_id) values ($1, $2, $3)',
    [id,name,reg_id],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rowCount)
    }
    )
})

app.put('/country/:id',(req,res)=>{
    const {id} = req.params
    const {new_id} = req.body
    const {name} = req.body
    const {reg_id} = req.body
    pool.query('update countries set country_id=$2, country_name=$3, region_id=$4 where country_id = $1',
    [id,new_id,name,reg_id],
    (error,result)=>{
        if(error){
            throw error
        }
        res.json(result.rowCount)
    }
    )
})

app.delete('/country/:id',(req,res)=>{
    const {id} = req.params
    pool.query('delete from countries where country_id = $1',
    [id],
    (error,result)=>{
        if(error){
            throw error
        }
        res.json(result.rowCount)
    }
    )
})

//jobs
app.get('/job',(req,res)=>{
    pool.query('select * from jobs',
    [],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rows)
    })
})

app.get('/job/:id',(req,res)=>{
    const {id} = req.params
    pool.query('select * from jobs where job_id = upper($1)',
    [id],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rows)
    }
    )
})

app.post('/job',(req,res)=>{
    const {id} =req.body
    const {title} = req.body
    const {min_sal} = req.body
    const {max_sal} = req.body
    pool.query('insert into jobs(job_id, job_title, min_salary, max_salary) values ($1, $2, $3, $4)',
    [id,title,min_sal,max_sal],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rowCount)
    }
    )
})

app.put('/job/:id',(req,res)=>{
    const {id} = req.params
    const {new_id} = req.body
    const {title} = req.body
    const {min_sal} = req.body
    const {max_sal} = req.body
    pool.query('update jobs set job_id = $2, job_title = $3, min_salary = $4, max_salary = $5 where job_id = $1',
    [id,new_id,title,min_sal,max_sal],
    (error,result)=>{
        if(error){
            throw error
        }
        res.json(result.rowCount)
    }
    )
})

app.delete('/job/:id',(req,res)=>{
    const {id} = req.params
    pool.query('delete from jobs where job_id = $1',
    [id],
    (error,result)=>{
        if(error){
            throw error
        }
        res.json(result.rowCount)
    }
    )
})

//locations
app.get('/location',(req,res)=>{
    pool.query('select * from locations',
    [],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rows)
    })
})

app.get('/location/:id',(req,res)=>{
    const {id} = req.params
    pool.query('select * from locations where location_id = $1',
    [id],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rows)
    }
    )
})

app.post('/location',(req,res)=>{
    const {id} =req.body
    const {address} = req.body
    const {postal} = req.body
    const {city} = req.body
    const {state} = req.body
    const {country_id} = req.body
    pool.query('insert into locations(location_id, street_address, postal_code, city, state_province, country_id) values ($1, $2, $3, $4, $5, $6)',
    [id,address,postal,city,state,country_id],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rowCount)
    }
    )
})

app.put('/location/:id',(req,res)=>{
    const {id} =req.params
    const {new_id} =req.body
    const {address} = req.body
    const {postal} = req.body
    const {city} = req.body
    const {state} = req.body
    const {country_id} = req.body
    pool.query('update locations set location_id = $2, street_address = $3, postal_code = $4, city = $5, state_province = $6, country_id = $7 where location_id = $1',
    [id,new_id,address,postal,city,state,country_id],
    (error,result)=>{
        if(error){
            throw error
        }
        res.json(result.rowCount)
    }
    )
})

app.delete('/location/:id',(req,res)=>{
    const {id} = req.params
    pool.query('delete from locations where location_id = $1',
    [id],
    (error,result)=>{
        if(error){
            throw error
        }
        res.json(result.rowCount)
    }
    )
})

//employees
app.get('/employee',(req,res)=>{
    pool.query('select * from employees',
    [],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rows)
    })
})

app.get('/employee/:id',(req,res)=>{
    const {id} = req.params
    pool.query('select * from employees where employee_id = $1',
    [id],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rows)
    }
    )
})

app.post('/employee',(req,res)=>{
    const {id} =req.body
    const {f_name} = req.body
    const {l_name} = req.body
    const {email} = req.body
    const {phone} = req.body
    const {hire} = req.body
    const {salary} = req.body
    const {commision} = req.body
    const {job_id} = req.body
    const {manager_id} = req.body
    const {department_id} = req.body
    const {xemp} = req.body

    pool.query('insert into employees(employee_id, first_name, last_name, email, phone_number, hire_date, salary, commision_pct, job_id, manager_id, department_id, xemp) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
    [id,f_name,l_name,email,phone,hire,salary,commision,job_id,manager_id,department_id,xemp],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rowCount)
    }
    )
})

app.put('/employee/:id',(req,res)=>{
    const {id} =req.params
    const {new_id} =req.body
    const {f_name} = req.body
    const {l_name} = req.body
    const {email} = req.body
    const {phone} = req.body
    const {hire} = req.body
    const {salary} = req.body
    const {commision} = req.body
    const {job_id} = req.body
    const {manager_id} = req.body
    const {department_id} = req.body
    const {xemp} = req.body

    pool.query('update employees set employee_id = $2, first_name = $3, last_name = $4, email = $5, phone_number = $6, hire_date = $7, salary = $8, commision_pct = $9, job_id = $10, manager_id = $11, department_id = $12, xemp = $13 where employee_id = $1',
    [id,new_id,f_name,l_name,email,phone,hire,salary,commision,job_id,manager_id,department_id,xemp],
    (error,result)=>{
        if(error){
            throw error
        }
        res.json(result.rowCount)
    }
    )
})

app.delete('/employee/:id',(req,res)=>{
    const {id} = req.params
    pool.query('delete from employees where employee_id = $1',
    [id],
    (error,result)=>{
        if(error){
            throw error
        }
        res.json(result.rowCount)
    }
    )
})

//departments
app.get('/department',(req,res)=>{
    pool.query('select * from departments',
    [],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rows)
    })
})

app.get('/department/:id',(req,res)=>{
    const {id} = req.params
    pool.query('select * from departments where department_id = $1',
    [id],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rows)
    }
    )
})

app.post('/department',(req,res)=>{
    const {id} =req.body
    const {d_name} = req.body
    const {manager_id} = req.body
    const {location_id} = req.body

    pool.query('insert into departments(department_id, department_name, manager_id, location_id) values ($1, $2, $3, $4)',
    [id,d_name,manager_id,location_id],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rowCount)
    }
    )
})

app.put('/department/:id',(req,res)=>{
    const {id} =req.params
    const {d_name} = req.body
    const {manager_id} = req.body
    const {location_id} = req.body

    pool.query('update departments set department_name = $2, manager_id = $3, location_id = $4 where department_id = $1',
    [id,d_name,manager_id,location_id],
    (error,result)=>{
        if(error){
            throw error
        }
        res.json(result.rowCount)
    }
    )
})

app.delete('/department/:id',(req,res)=>{
    const {id} = req.params
    pool.query('delete from departments where department_id = $1',
    [id],
    (error,result)=>{
        if(error){
            throw error
        }
        res.json(result.rowCount)
    }
    )
})


// job history
app.get('/job-history',(req,res)=>{
    pool.query('select * from job_history',
    [],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rows)
    })
})

app.get('/job-history/:id',(req,res)=>{
    const {id} = req.params
    pool.query('select * from job_history where employee_id = $1',
    [id],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rows)
    }
    )
})

app.post('/job-history',(req,res)=>{
    const {id} =req.body
    const {start} = req.body
    const {end} = req.body
    const {job_id} = req.body
    const {department_id} = req.body

    pool.query('insert into job_history(employee_id, start_date, end_date, job_id, department_id) values ($1, $2, $3, $4, $5)',
    [id,start,end,job_id,department_id],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rowCount)
    }
    )
})

app.put('/job-history/:id',(req,res)=>{
    const {id} =req.params
    const {start} = req.body
    const {end} = req.body
    const {job_id} = req.body
    const {department_id} = req.body

    pool.query('update job_history set start_date = $2, end_date = $3, job_id = $4, department_id = $5 where employee_id = $1',
    [id,start,end,job_id,department_id],
    (error,result)=>{
        if(error){
            throw error
        }
        res.json(result.rowCount)
    }
    )
})

app.delete('/job-history/:id',(req,res)=>{
    const {id} = req.params
    pool.query('delete from job_history where employee_id = $1',
    [id],
    (error,result)=>{
        if(error){
            throw error
        }
        res.json(result.rowCount)
    }
    )
})