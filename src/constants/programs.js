const programs = [
    {
      image: require('../assets/images_programs/program_strength.jpg'),
      title: "Strength Training Program",
      description: "This program is designed for individuals aiming to build strength and increase muscle mass. It focuses on fundamental strength exercises that stimulate muscle growth and enhance body stability. Suitable for both men and women at any fitness level.",
      workouts: [
        {
          title: "Upper Body Strength Workout",
          duration: 45,
          exercises: [
            {
              name: "Bench Press",
              description: "An exercise to develop the chest and triceps. Lie on a bench, hold the barbell, and press it upward."
            },
            {
              name: "Dumbbell Row",
              description: "A back and shoulder exercise. Stand, lean forward, and pull the dumbbells toward your waist."
            },
            {
              name: "Overhead Press",
              description: "A shoulder and arm exercise. Hold the barbell at shoulder height and press it overhead."
            },
            {
              name: "Bicep Curl",
              description: "Curl the dumbbells to develop the biceps. Lift the weights towards your shoulders, keeping your elbows still."
            },
            {
              name: "Tricep Extension",
              description: "Hold dumbbells above your head, bending and straightening your arms to work the triceps."
            },
            {
              name: "Rear Delt Raise",
              description: "An exercise for the rear deltoids. Lean forward and lift the dumbbells out to your sides."
            }
          ]
        },
        {
          title: "Lower Body Strength Workout",
          duration: 50,
          exercises: [
            {
              name: "Barbell Squat",
              description: "A leg and glute exercise. Stand under the barbell, hold it on your shoulders, and squat down."
            },
            {
              name: "Dumbbell Lunge",
              description: "An exercise for glutes and quadriceps. Step forward and lower your body, holding dumbbells."
            },
            {
              name: "Calf Raise",
              description: "An exercise to strengthen the calves. Rise onto the balls of your feet, holding a barbell on your shoulders."
            },
            {
              name: "Romanian Deadlift",
              description: "An exercise for the hamstrings and glutes. Bend forward slightly, keeping your knees soft, and lift the weight."
            },
            {
              name: "Leg Curl",
              description: "A hamstring exercise. Lie on the machine and curl your legs toward your glutes."
            },
            {
              name: "Leg Extension",
              description: "An exercise for the quadriceps. Extend your legs in the machine to lift the weight."
            }
          ]
        },
        {
          title: "Full Body Strength Circuit",
          duration: 40,
          exercises: [
            {
              name: "Kettlebell Swing",
              description: "A dynamic exercise for the full body. Swing the kettlebell between your legs and up to shoulder height."
            },
            {
              name: "Push-Ups",
              description: "A bodyweight exercise for the chest, shoulders, and triceps. Lower and push up your body in a plank position."
            },
            {
              name: "Goblet Squat",
              description: "Hold a kettlebell or dumbbell at chest level and squat down, keeping your back straight."
            },
            {
              name: "Plank Row",
              description: "In a plank position, lift one dumbbell at a time toward your waist, alternating sides."
            },
            {
              name: "Russian Twist",
              description: "Sit on the floor with feet lifted, rotating your torso to each side while holding a weight."
            },
            {
              name: "Burpees",
              description: "A full-body exercise. From a standing position, drop into a squat, kick your feet back, perform a push-up, and jump back up."
            }
          ]
        },
        {
          title: "Core Strength Workout",
          duration: 30,
          exercises: [
            {
              name: "Crunches",
              description: "Lie on your back with knees bent, lifting your shoulders towards your knees to engage the core."
            },
            {
              name: "Bicycle Crunch",
              description: "Lie on your back and alternate bringing each elbow towards the opposite knee in a pedaling motion."
            },
            {
              name: "Leg Raises",
              description: "Lie flat and lift your legs up, keeping them straight, to engage the lower abs."
            },
            {
              name: "Plank",
              description: "Hold a plank position on your elbows and toes to strengthen the entire core."
            },
            {
              name: "Side Plank",
              description: "Hold a side plank on one elbow to target obliques, then switch sides."
            },
            {
              name: "Mountain Climbers",
              description: "In a plank position, alternate bringing each knee towards the chest in a running motion."
            }
          ]
        },
        {
          title: "Power and Plyometrics",
          duration: 35,
          exercises: [
            {
              name: "Box Jump",
              description: "Stand in front of a box and jump onto it, landing with both feet."
            },
            {
              name: "Jump Squats",
              description: "Perform a squat, then jump as high as possible, landing softly."
            },
            {
              name: "Lateral Bounds",
              description: "Jump from side to side in a skater motion, landing on one foot each time."
            },
            {
              name: "Broad Jumps",
              description: "Jump forward as far as possible, focusing on explosive power."
            },
            {
              name: "High Knees",
              description: "Run in place, lifting your knees high with each step to increase intensity."
            },
            {
              name: "Tuck Jumps",
              description: "Jump and pull your knees toward your chest, landing softly."
            }
          ]
        }
      ]
    },
    {
      image: require('../assets/images_programs/program_flexibility.jpg'),
      title: "Flexibility and Mobility Program",
      description: "This program is designed to enhance flexibility and joint mobility, helping improve muscle elasticity and reduce injury risk. Ideal for those looking to increase range of motion and recover better. Suitable for men and women of all fitness levels.",
      workouts: [
        {
          title: "Back and Shoulder Flexibility",
          duration: 30,
          exercises: [
            {
              name: "Cat-Cow Stretch",
              description: "Start on all fours, alternate between arching your back upwards and downwards to stretch the spine and relieve tension."
            },
            {
              name: "Shoulder Stretch",
              description: "Extend one arm across your chest and hold it with the opposite arm to stretch the shoulder muscles."
            },
            {
              name: "Child’s Pose",
              description: "Sit back on your heels, extend your arms forward on the floor, and lower your torso to stretch the back and shoulders."
            },
            {
              name: "Thoracic Rotation",
              description: "On all fours, place one hand behind your head, then rotate your torso, bringing your elbow towards the opposite arm."
            },
            {
              name: "Arm Circles",
              description: "Extend your arms to the sides and perform small, controlled circles to increase shoulder mobility."
            },
            {
              name: "Thread the Needle",
              description: "Kneel on all fours, slide one arm underneath your body, lowering your shoulder to stretch the upper back."
            }
          ]
        },
        {
          title: "Lower Body Mobility",
          duration: 35,
          exercises: [
            {
              name: "Hip Flexor Stretch",
              description: "Step one leg forward and sink into a lunge, pushing your hips forward to stretch the hip flexors."
            },
            {
              name: "Hamstring Stretch",
              description: "Sit on the floor with one leg extended, reaching toward your toes to stretch the hamstrings."
            },
            {
              name: "Ankle Circles",
              description: "Sit with one leg crossed over the other, moving your foot in circles to increase ankle flexibility."
            },
            {
              name: "Standing Quad Stretch",
              description: "Stand on one leg, hold the opposite ankle and pull it towards your glutes to stretch the quadriceps."
            },
            {
              name: "Pigeon Pose",
              description: "From a plank position, bring one knee forward and lay your leg on the ground in front of you to open up the hips."
            },
            {
              name: "Seated Forward Bend",
              description: "Sit with your legs together and extend forward, reaching toward your toes to stretch the hamstrings and lower back."
            }
          ]
        },
        {
          title: "Dynamic Stretching Routine",
          duration: 25,
          exercises: [
            {
              name: "Leg Swings",
              description: "Stand on one leg, swing the opposite leg forward and backward to improve hip mobility."
            },
            {
              name: "Arm Swings",
              description: "Stand with arms extended, swing them across your chest and back to stretch the shoulders dynamically."
            },
            {
              name: "Lunge with Twist",
              description: "Step into a lunge position and twist your torso towards your front leg, stretching the hips and spine."
            },
            {
              name: "Side Lunges",
              description: "Step out to the side, lowering into a squat on one leg while keeping the other leg straight to stretch the inner thighs."
            },
            {
              name: "High Knees",
              description: "Jog in place, lifting your knees high to warm up and loosen the lower body muscles."
            },
            {
              name: "Butt Kicks",
              description: "Jog in place, bringing your heels up towards your glutes to dynamically stretch the quadriceps."
            }
          ]
        },
        {
          title: "Full Body Stretching",
          duration: 40,
          exercises: [
            {
              name: "Standing Forward Bend",
              description: "Stand with feet together, bend forward at the hips, and reach towards the floor to stretch the hamstrings and lower back."
            },
            {
              name: "Butterfly Stretch",
              description: "Sit on the floor, press the soles of your feet together and gently push your knees down to stretch the inner thighs."
            },
            {
              name: "Side Stretch",
              description: "Stand with feet apart, reach one arm overhead and lean to the side to stretch the obliques and lats."
            },
            {
              name: "Cobra Stretch",
              description: "Lie on your stomach, place hands under your shoulders, and lift your chest for an abdominal and lower back stretch."
            },
            {
              name: "Kneeling Hip Stretch",
              description: "Kneel on one knee, push your hips forward to stretch the hip flexors of the back leg."
            },
            {
              name: "Spinal Twist",
              description: "Sit on the floor, place one leg over the other, and twist your torso towards the raised knee to stretch the spine."
            }
          ]
        },
        {
          title: "Morning Mobility Flow",
          duration: 20,
          exercises: [
            {
              name: "Neck Rolls",
              description: "Gently roll your neck in a circular motion to release tension and increase flexibility."
            },
            {
              name: "Shoulder Shrugs",
              description: "Lift your shoulders up towards your ears, then release, loosening up the shoulders and traps."
            },
            {
              name: "Torso Twists",
              description: "Stand with feet shoulder-width apart and twist your torso from side to side to stretch the back and core."
            },
            {
              name: "Knee Hugs",
              description: "Stand on one leg, bring the opposite knee to your chest, holding for a few seconds to stretch the glutes and lower back."
            },
            {
              name: "Standing Side Bend",
              description: "Stand with feet together, reach one arm overhead, and bend sideways to stretch the lats and obliques."
            },
            {
              name: "Ankle Rolls",
              description: "Stand on one leg, rotate your opposite ankle in circles to increase flexibility and warm up the joint."
            }
          ]
        }
      ]
    },
    {
      image: require('../assets/images_programs/program_endurance.jpg'),
      title: "Endurance and Cardio Program",
      description: "This program is focused on building overall endurance and strengthening cardiovascular health. It combines cardio and high-intensity interval training (HIIT) to effectively burn calories and improve stamina. Suitable for all fitness levels, this program is ideal for both men and women.",
      workouts: [
        {
          title: "HIIT Cardio Blast",
          duration: 30,
          exercises: [
            {
              name: "Jump Rope",
              description: "Jump rope continuously for 1 minute intervals to raise your heart rate and improve coordination."
            },
            {
              name: "Mountain Climbers",
              description: "From a plank position, alternate bringing each knee toward your chest in a running motion to engage the core and elevate your heart rate."
            },
            {
              name: "High Knees",
              description: "Run in place, lifting your knees as high as possible to get your heart rate up and activate your leg muscles."
            },
            {
              name: "Burpees",
              description: "From a standing position, squat down, kick your legs back, do a push-up, then jump back to standing to work the entire body."
            },
            {
              name: "Jump Squats",
              description: "Perform a squat, then jump as high as you can, landing softly to minimize impact on your knees."
            },
            {
              name: "Plank Jacks",
              description: "In a plank position, jump your feet out wide and back together in quick intervals to engage your core and legs."
            }
          ]
        },
        {
          title: "Endurance Run",
          duration: 40,
          exercises: [
            {
              name: "Warm-Up Jog",
              description: "Start with a light 5-minute jog to gradually increase your heart rate and prepare your muscles."
            },
            {
              name: "Steady-State Run",
              description: "Run at a steady, moderate pace for 20 minutes to build cardiovascular endurance."
            },
            {
              name: "Incline Sprints",
              description: "On a treadmill or hill, sprint uphill for 30 seconds, followed by a 30-second rest. Repeat for 10 minutes."
            },
            {
              name: "Cool-Down Walk",
              description: "End the session with a slow 5-minute walk to gradually lower your heart rate."
            },
            {
              name: "Stretching",
              description: "Perform light stretches for your legs and hips to aid recovery and flexibility after running."
            }
          ]
        },
        {
          title: "Plyometric Power",
          duration: 35,
          exercises: [
            {
              name: "Box Jumps",
              description: "Stand in front of a sturdy box, jump onto it, then step down to work on explosive leg power."
            },
            {
              name: "Lateral Bounds",
              description: "Jump from side to side in a skater motion, landing on one foot each time to improve balance and agility."
            },
            {
              name: "Tuck Jumps",
              description: "Jump and bring your knees towards your chest, landing softly to reduce joint impact."
            },
            {
              name: "Broad Jumps",
              description: "Stand with feet shoulder-width apart, jump forward as far as possible, landing on both feet."
            },
            {
              name: "Single-Leg Hops",
              description: "Hop forward on one leg for a set distance, then switch legs to work on single-leg strength and stability."
            },
            {
              name: "Depth Jumps",
              description: "Step off a box, land softly, then immediately jump vertically to improve reactive strength."
            }
          ]
        },
        {
          title: "Circuit Cardio",
          duration: 45,
          exercises: [
            {
              name: "Rowing Machine",
              description: "Row at a fast pace for 5 minutes to activate your entire body and increase cardiovascular intensity."
            },
            {
              name: "Battle Ropes",
              description: "Grab both ends of the ropes and create wave-like motions for 1 minute intervals to build endurance and upper body strength."
            },
            {
              name: "Ski Erg",
              description: "Use the ski erg machine to mimic skiing motions, working both upper and lower body for a full 5 minutes."
            },
            {
              name: "Stationary Bike",
              description: "Cycle at a moderate pace for 5 minutes, then perform sprints every 30 seconds to build leg endurance."
            },
            {
              name: "Treadmill Run",
              description: "Run at a steady pace for 10 minutes to keep up the heart rate and maintain endurance."
            },
            {
              name: "Elliptical Sprints",
              description: "Sprint on the elliptical machine for 30 seconds, then recover for 30 seconds, repeating for 5 minutes."
            }
          ]
        },
        {
          title: "Tabata Cardio Workout",
          duration: 20,
          exercises: [
            {
              name: "Sprint Intervals",
              description: "Sprint at maximum effort for 20 seconds, then rest for 10 seconds, repeating for 4 minutes."
            },
            {
              name: "Jumping Jacks",
              description: "Perform jumping jacks at high intensity for 20 seconds, then rest for 10 seconds, repeating for 4 minutes."
            },
            {
              name: "Kettlebell Swings",
              description: "Swing a kettlebell between your legs, driving with your hips, for 20 seconds on and 10 seconds off for 4 minutes."
            },
            {
              name: "Rowing Machine Sprints",
              description: "Row at a fast pace for 20 seconds, then rest for 10 seconds, repeating for 4 minutes."
            },
            {
              name: "Burpee Intervals",
              description: "Perform burpees at full effort for 20 seconds, followed by a 10-second rest, for a total of 4 minutes."
            },
            {
              name: "High Knees",
              description: "Run in place with high knees for 20 seconds, rest for 10 seconds, repeating for 4 minutes."
            }
          ]
        }
      ]
    },
    {
      image: require('../assets/images_programs/program_balance.jpg'),
      title: "Balance and Coordination Program",
      description: "This program focuses on enhancing balance and coordination, which are crucial for injury prevention and overall control over body movements. Ideal for all fitness levels, it includes exercises that build core stability, spatial awareness, and control, making it suitable for both men and women.",
      workouts: [
        {
          title: "Core Stability Workout",
          duration: 30,
          exercises: [
            {
              name: "Single-Leg Balance",
              description: "Stand on one leg and hold the position for 30 seconds on each side to improve core stability and balance."
            },
            {
              name: "Plank with Arm Lift",
              description: "In a plank position, lift one arm at a time while keeping your core engaged to work on stability."
            },
            {
              name: "Bird Dog",
              description: "On all fours, extend one arm and the opposite leg, then switch sides, engaging the core to improve balance."
            },
            {
              name: "Stability Ball Pass",
              description: "Lie on your back, pass a stability ball from your hands to your feet and back to build core coordination."
            },
            {
              name: "Side Plank",
              description: "Hold a side plank position on one elbow to engage obliques and improve lateral stability."
            },
            {
              name: "Standing March",
              description: "Stand on one leg, raise the opposite knee and alternate sides to improve balance and stability."
            }
          ]
        },
        {
          title: "Lower Body Balance Training",
          duration: 35,
          exercises: [
            {
              name: "Single-Leg Deadlift",
              description: "Stand on one leg, hinge at the hips and lower your torso forward, extending the opposite leg back for balance."
            },
            {
              name: "Lateral Step-Ups",
              description: "Stand beside a step or box, step up sideways on one leg, then step down to work on coordination and leg strength."
            },
            {
              name: "Clock Lunges",
              description: "Lunge in different directions like a clock face to challenge balance and increase spatial awareness."
            },
            {
              name: "Heel-to-Toe Walk",
              description: "Walk in a straight line, placing one foot directly in front of the other to improve foot control and balance."
            },
            {
              name: "Single-Leg Squat",
              description: "Stand on one leg, lower into a squat, and rise back up to strengthen leg stability and balance."
            },
            {
              name: "Side Leg Raises",
              description: "Stand on one leg and lift the other leg to the side, engaging your glutes and stabilizing leg for balance."
            }
          ]
        },
        {
          title: "Upper Body Coordination",
          duration: 25,
          exercises: [
            {
              name: "Single-Arm Dumbbell Press",
              description: "Hold a dumbbell in one hand, press it overhead while keeping your core engaged to maintain balance."
            },
            {
              name: "Ball Toss with Catch",
              description: "Toss a small ball against a wall and catch it with the same hand to improve hand-eye coordination."
            },
            {
              name: "Resistance Band Pull",
              description: "Hold a resistance band with both hands and pull it apart, working on shoulder stability and coordination."
            },
            {
              name: "Overhead Reach with Stability Ball",
              description: "Hold a stability ball overhead and tilt slightly, engaging your core to maintain balance."
            },
            {
              name: "Single-Leg Row",
              description: "Balance on one leg, lean forward and perform a row with a dumbbell to work on coordination and stability."
            },
            {
              name: "Shoulder Tap Planks",
              description: "In a plank position, tap each shoulder with the opposite hand, alternating sides to improve upper body stability."
            }
          ]
        },
        {
          title: "Dynamic Balance Routine",
          duration: 40,
          exercises: [
            {
              name: "Skater Jumps",
              description: "Jump from side to side in a skating motion, landing on one foot each time to work on dynamic balance."
            },
            {
              name: "Agility Ladder Drills",
              description: "Perform quick foot movements through an agility ladder to improve speed, agility, and coordination."
            },
            {
              name: "Lateral Hops",
              description: "Stand on one foot and hop sideways to challenge lateral balance and stability."
            },
            {
              name: "Single-Leg Box Jump",
              description: "Stand on one leg, jump onto a low box, and step down carefully to work on balance and power."
            },
            {
              name: "Crossover Steps",
              description: "Step one foot over the other as you move sideways, increasing coordination and balance."
            },
            {
              name: "Walking Lunges with Rotation",
              description: "Perform walking lunges, rotating your torso over the forward leg to engage core and balance."
            }
          ]
        },
        {
          title: "Yoga Balance Flow",
          duration: 20,
          exercises: [
            {
              name: "Tree Pose",
              description: "Stand on one leg, place the sole of your other foot on the inner thigh, and hold for balance."
            },
            {
              name: "Warrior III",
              description: "Stand on one leg, extend your torso forward and raise the opposite leg back to form a straight line."
            },
            {
              name: "Half Moon Pose",
              description: "From a standing position, lean to one side, lifting the opposite leg and reaching towards the ground."
            },
            {
              name: "Eagle Pose",
              description: "Wrap one leg around the other and cross your arms in front for a deep balance challenge."
            },
            {
              name: "Chair Pose",
              description: "Stand with feet together, bend your knees and extend your arms overhead for lower body stability."
            },
            {
              name: "Dancer's Pose",
              description: "Hold one foot behind you with the same hand, reaching forward with the opposite hand for balance."
            }
          ]
        }
      ]
    },
    {
      image:  require('../assets/images_programs/program_yoga.jpg'),
      title: "Yoga and Relaxation Program",
      description: "This program focuses on relaxation through yoga, combining gentle poses that relieve stress, improve flexibility, and promote mental calmness. Suitable for all fitness levels, it helps both men and women unwind while enhancing body and mind connection.",
      workouts: [
        {
          title: "Morning Yoga Flow",
          duration: 30,
          exercises: [
            {
              name: "Sun Salutation",
              description: "A sequence of poses including forward bends and lunges that gently warm up the body and awaken energy."
            },
            {
              name: "Cat-Cow Pose",
              description: "Move between arching your back and rounding it to stretch the spine and increase flexibility."
            },
            {
              name: "Downward Facing Dog",
              description: "Form an inverted V-shape with your body, stretching the hamstrings, shoulders, and back."
            },
            {
              name: "Cobra Pose",
              description: "Lie on your stomach, push up onto your forearms to gently stretch the spine and open the chest."
            },
            {
              name: "Warrior I",
              description: "Step one foot forward, bending the knee, and extend arms overhead to build focus and balance."
            },
            {
              name: "Mountain Pose",
              description: "Stand tall with feet together, arms by your sides, and focus on grounding yourself and relaxing."
            }
          ]
        },
        {
          title: "Evening Relaxation Yoga",
          duration: 35,
          exercises: [
            {
              name: "Child's Pose",
              description: "Sit back on your heels, stretch your arms forward, and rest your forehead on the floor for relaxation."
            },
            {
              name: "Seated Forward Bend",
              description: "Sit with legs extended and bend forward to stretch the back and calm the nervous system."
            },
            {
              name: "Supine Twist",
              description: "Lie on your back, bring one knee over the other leg and twist to stretch the lower back."
            },
            {
              name: "Legs Up the Wall",
              description: "Lie on your back with your legs extended up a wall to relieve tired legs and relax."
            },
            {
              name: "Reclined Butterfly",
              description: "Lie on your back, bring the soles of your feet together, and let your knees fall open to stretch the hips."
            },
            {
              name: "Savasana",
              description: "Lie flat on your back, let your arms and legs relax, and focus on deep breathing for full relaxation."
            }
          ]
        },
        {
          title: "Flexibility and Flow",
          duration: 40,
          exercises: [
            {
              name: "Extended Triangle Pose",
              description: "Stand with legs apart, reach one hand down to the ankle and extend the other overhead to open the hips and chest."
            },
            {
              name: "Half Split",
              description: "From a lunge, straighten the front leg and fold forward to stretch the hamstrings."
            },
            {
              name: "Pigeon Pose",
              description: "Bring one knee forward and extend the other leg back, sinking into the hips to open them up."
            },
            {
              name: "Bridge Pose",
              description: "Lie on your back, bend your knees, lift your hips to stretch the chest, and engage the glutes."
            },
            {
              name: "Revolved Side Angle",
              description: "Lunge forward and twist your torso, placing one hand on the floor to deepen the stretch in the spine and hips."
            },
            {
              name: "Camel Pose",
              description: "Kneel and lean back, placing your hands on your heels to open the chest and stretch the front of the body."
            }
          ]
        },
        {
          title: "Mindfulness and Breathing",
          duration: 20,
          exercises: [
            {
              name: "Deep Belly Breathing",
              description: "Sit or lie down, placing a hand on your stomach, and focus on slow, deep breaths to calm the mind."
            },
            {
              name: "Alternate Nostril Breathing",
              description: "Close one nostril at a time, breathing in and out to balance energy and promote relaxation."
            },
            {
              name: "Box Breathing",
              description: "Inhale for 4 seconds, hold for 4, exhale for 4, and hold for 4 again to reduce stress and promote calm."
            },
            {
              name: "Guided Visualization",
              description: "Imagine a peaceful place, focusing on the details to relax your mind and body."
            },
            {
              name: "Body Scan Meditation",
              description: "Mentally scan each part of your body from head to toe, releasing tension as you go."
            },
            {
              name: "Silent Sitting",
              description: "Sit comfortably, close your eyes, and focus on your breathing, allowing your mind to rest in silence."
            }
          ]
        },
        {
          title: "Full Body Stretching",
          duration: 25,
          exercises: [
            {
              name: "Standing Forward Bend",
              description: "Stand with feet together, fold forward at the hips, reaching towards the floor to stretch the hamstrings and back."
            },
            {
              name: "Butterfly Stretch",
              description: "Sit with the soles of your feet together and gently press your knees towards the floor to stretch the inner thighs."
            },
            {
              name: "Side Stretch",
              description: "Stand and reach one arm overhead, bending to the side to stretch the obliques and lat muscles."
            },
            {
              name: "Kneeling Hip Flexor Stretch",
              description: "Kneel on one knee, push your hips forward to stretch the hip flexors and quadriceps."
            },
            {
              name: "Seated Twist",
              description: "Sit with one leg crossed over the other, twisting your torso towards the raised knee to stretch the spine."
            },
            {
              name: "Happy Baby Pose",
              description: "Lie on your back, grab the soles of your feet, and gently rock side to side to open the hips."
            }
          ]
        }
      ]
    }
  ];

  export default programs;
